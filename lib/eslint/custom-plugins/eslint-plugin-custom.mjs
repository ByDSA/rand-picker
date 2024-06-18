const plugin = {
  meta: {
    name: "eslint-plugin-custom",
    version: "0.0.1",
  },
  rules: {
    "no-leading-blank-lines": {
      meta: {
        fixable: "code",
      },
      create(context) {
        const checkNode = (node) => {
          const sourceCode = context.getSourceCode();
          const lines = sourceCode.lines;
          let line = 0;
          while (line < lines.length && lines[line].trim() === "") {
              context.report({
                  node,
                  loc: { line: line + 1, column: 0 },
                  message: "Leading blank lines are not allowed.",
                  fix: function(fixer) {
                      const rangeStart = sourceCode.getIndexFromLoc({ line: line + 1, column: 0 });
                      const rangeEnd = sourceCode.getIndexFromLoc({ line: line + 2, column: 0 });
                      return fixer.removeRange([rangeStart, rangeEnd]);
                  }
              });
              line++;
            }
        };
        return {
          Program: checkNode,
        };
      },
    },
    "no-blank-lines-after-decorator": {
      meta: {
        fixable: "code",
      },
      create(context) {
        function checkNode(node) {
          const { decorators } = node;

          if (decorators && decorators.length > 0) {
            const decorator = decorators.at(-1);
            const decoratorLine = decorator.loc.end.line;
            let nodeLoc;
            let nodeRange;
            if (node.type === "ClassDeclaration") {
              nodeLoc = node.loc;
              nodeRange = node.range;
            } else {
              nodeLoc = node.key.loc;
              nodeRange = node.key.range;
            }

            let nodeLine = nodeLoc.start.line;

            if (decoratorLine + 1 !== nodeLine) {
             context.report( {
                node,
                message: "There should be no blank lines after a decorator.",
                fix: function(fixer) {
                  const range = [decorator.range[1], nodeRange[0] - nodeLoc.start.column];
                  return fixer.replaceTextRange(range, "\n");
                }
              } );
            }
          }
        };
        return {
          PropertyDefinition: checkNode,
          MethodDefinition: checkNode,
          ClassDeclaration: checkNode,
        };
      },
    },
    "no-blank-lines-between-decorators": {
      meta: {
        fixable: "code",
      },
      create(context) {
        return {
          PropertyDefinition(node) {
            const { decorators } = node;

            for(let i = 1; i < decorators.length; i++) {
              const previousDecorator = decorators[i - 1];
              const currentDecorator = decorators[i];

              const previousDecoratorLine = previousDecorator.loc.end.line;
              const currentDecoratorLine = currentDecorator.loc.start.line;

              if (previousDecoratorLine + 1 !== currentDecoratorLine) {
                context.report( {
                  node,
                  message: "There should be no blank lines between decorators.",
                  fix: function(fixer) {
                    const range = [previousDecorator.range[1], currentDecorator.range[0] - currentDecorator.loc.start.column];
                    return fixer.replaceTextRange(range, "\n");
                  }
                } );
              }
            }
          },
        };
      },
    },
    "indent-after-decorator": {
      meta: {
        fixable: "code",
      },
      create(context) {
        return {
          PropertyDefinition(node) {
            const { decorators } = node;

            if (decorators && decorators.length > 0) {
              for(let i = 1; i < decorators.length; i++) {
                const decorator = decorators[i];
                const decoratorIndent = decorator.loc.start.column;

                  const previousDecorator = decorators[i - 1];
                  const previousDecoratorStartColumn = previousDecorator.loc.start.column;

                  if (decoratorIndent !== previousDecoratorStartColumn) {
                    console.log(previousDecoratorStartColumn, previousDecorator.range[1], decorator.range[0], decoratorIndent);
                    context.report( {
                      node,
                      message: `Decorator should have the same indentation as the previous decorator. Expected ${previousDecoratorStartColumn} spaces but found ${decoratorIndent}.`,
                      fix: function(fixer) {
                        const spaces = "\n" + " ".repeat(previousDecoratorStartColumn);
                        const range = [previousDecorator.range[1], decorator.range[0]];
                        return fixer.replaceTextRange(range, spaces);
                      }
                    } );
                  }

            }

            const firstDecorator = decorators.at(0);
            const decoratorIndent = firstDecorator.loc.start.column;

            const propertyLine = context.getSourceCode().getText(node).split("\n").at(-1);
                const propertyIndent = propertyLine.search(/\S|$/); // Encuentra el primer carácter no en blanco

                if (decoratorIndent !== propertyIndent) {
                  context.report( {
                    node,
                    message: `Property should have the same indentation as its decorator. Expected ${decoratorIndent} spaces but found ${propertyIndent}.`,
                    fix: function(fixer) {
                      const spaces = " ".repeat(decoratorIndent);
                      let propertyTokenStartColumn = node.key.loc.start.column;
                      const leftPad = propertyTokenStartColumn - propertyIndent; // Para tener en cuenta carácteres especiales como "[" o "("
                      const range = [node.key.range[0] - propertyTokenStartColumn, node.key.range[0] - leftPad];
                      return fixer.replaceTextRange(range, spaces);
                    }
                  } );
                }
          }
          },
        };
      },
    },
    "no-multiple-exports-per-line": {
      meta: {
        type: "problem",
        docs: {
          description: "disallow multiple exports per line",
          category: "Best Practices",
          recommended: true,
        },
        fixable: "whitespace",
        schema: [], // no options
      },
      create(context) {
        return {
          ExportNamedDeclaration(node) {
            if (node.specifiers.length > 1) {
              const sourceCode = context.getSourceCode();
              const exportText = sourceCode.getText(node);

              const openBraceIndex = exportText.indexOf("{");
              const closeBraceIndex = exportText.indexOf("}");

              if (openBraceIndex === -1 || closeBraceIndex === -1) {
                return;
              }

              const exportContent = exportText.slice(openBraceIndex + 1, closeBraceIndex);

              if (exportContent.includes(", ")) {
                context.report({
                  node,
                  message: "Exporting multiple elements per line is not allowed.",
                  fix(fixer) {
                    const fixedExportText = exportText
                      .replace(/,\s*/g, ",\n");

                    return fixer.replaceText(node, fixedExportText);
                  },
                });
              }
            }
          },
        };
      },
    },
  },
};

export default plugin;