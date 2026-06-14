#!/usr/bin/env bash
set -euo pipefail

# Uso: ./deploy.sh -k key.pem -h HOST [-u user] [-s src_dir] [-r remote_dir]

KEY=""
USER="ec2-user"
HOST=""
SRC_DIR="."
REMOTE_DIR="~"
ARCHIVE="deploy.tar.gz"

while getopts "k:u:h:s:r:" opt; do
  case $opt in
    k) KEY="$OPTARG" ;;
    u) USER="$OPTARG" ;;
    h) HOST="$OPTARG" ;;
    s) SRC_DIR="$OPTARG" ;;
    r) REMOTE_DIR="$OPTARG" ;;
    *) echo "Usage: $0 -k key.pem -h host [-u user] [-s src_dir] [-r remote_dir]"; exit 1 ;;
  esac
done

if [[ -z "$KEY" || -z "$HOST" ]]; then
  echo "Falta key o host. Uso: $0 -k key.pem -h HOST [-u user] [-s src_dir] [-r remote_dir]"
  exit 1
fi

echo "Creando archivo de despliegue excluyendo node_modules, .git y .env..."
tar -czf "$ARCHIVE" -C "$SRC_DIR" . --exclude=node_modules --exclude=.git --exclude=.env

echo "Copiando $ARCHIVE a ${USER}@${HOST}:$REMOTE_DIR"
scp -i "$KEY" "$ARCHIVE" "${USER}@${HOST}:$REMOTE_DIR/"

echo "Extrayendo y ejecutando npm install en el servidor..."
ssh -i "$KEY" "${USER}@${HOST}" bash -lc "mkdir -p $REMOTE_DIR/deploy_tmp && tar -xzf $REMOTE_DIR/$ARCHIVE -C $REMOTE_DIR/deploy_tmp && rm $REMOTE_DIR/$ARCHIVE && cd $REMOTE_DIR/deploy_tmp && if [ -f package.json ]; then npm install --production; fi && rsync -a --delete $REMOTE_DIR/deploy_tmp/ $REMOTE_DIR/ && rm -rf $REMOTE_DIR/deploy_tmp"

echo "Limpieza local: $ARCHIVE"
rm -f "$ARCHIVE"

echo "Despliegue completado."
