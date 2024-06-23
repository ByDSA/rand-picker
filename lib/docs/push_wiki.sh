#!/bin/sh
set -e
script_dir=$(dirname "$0")

if [ ! -d "$script_dir/../../wiki" ]; then
  echo "No existe el directorio wiki"
  exit 1
fi

project_url=$(git config --file "$script_dir/../../.git/config" --get remote.origin.url | sed 's/.*\/\([^/]*\)\.git/\1/')
project=$(echo "$project_url" | sed 's/.*\/\([^/]*\)/\1/')

remote_wiki_folder_name=$project.wiki
remote_wiki_folder_path="$script_dir/../../$remote_wiki_folder_name"
if [ ! -d "$remote_wiki_folder_path" ]; then
  echo "No existe el directorio $remote_wiki_folder_name"
  echo "Clonando el wiki remoto"
  git clone "$project_url".wiki "$remote_wiki_folder_path"
  exit 1
fi

cd "$remote_wiki_folder_path"
rm -f ./*.md
cp -r "../wiki"/* ./
git add .
git commit -m "Update wiki $(date +'%Y-%m-%d %H:%M:%S')"
git push
