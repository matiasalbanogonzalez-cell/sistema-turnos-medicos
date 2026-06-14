# Despliegue rápido a EC2

No subir `node_modules` ni `.env`. Mejor instalar dependencias en la instancia.

1) Añade `.scpignore` (ya incluido):

- node_modules
- .git
- .env

2) Copiar código al servidor (ejemplo):

```
scp -i key.pem -r proyecto ec2-user@IP:~
```

3) Entrar al servidor y ejecutar:

```
ssh -i key.pem ec2-user@IP
npm install
```

4) Script de despliegue incluido: `deploy.sh`

Uso rápido:

```
./deploy.sh -k key.pem -h 1.2.3.4 -u ec2-user -s . -r ~/miapp
```

Atajos:
- Para cancelar operaciones con scp/ssh presioná `Ctrl+C`.
- Evitá usar OneDrive para proyectos en desarrollo; causa latencia en I/O.
