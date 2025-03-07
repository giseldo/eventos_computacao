# Usa uma imagem Python como base
FROM python:3.9

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos do projeto para o contêiner
COPY . /app

# Instala as dependências
RUN pip install -r requirements.txt

# Expõe a porta do Flask
EXPOSE 5000

# Comando para rodar o app
CMD ["python", "app.py"]
