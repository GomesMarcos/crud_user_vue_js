# Crud Users withs NodeJS MySQL e VueJS

## Running backend

### Comandos para criação da tabela no MySQL

Criação sugedira para estrutura da tabela no MySQL:

```

DROP TABLE IF EXISTS `usuarios`;



/*!40101 SET @saved_cs_client = @@character_set_client */;



/*!50503 SET character_set_client = utf8mb4 */;



CREATE TABLE `usuarios` (



`id` int unsigned NOT NULL AUTO_INCREMENT,



`nome` varchar(50) NOT NULL,



`email` varchar(50) NOT NULL,



PRIMARY KEY (`id`)



) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;



/*!40101 SET character_set_client = @saved_cs_client */;

```

## Após criação da tabela no MySQL, abra o terminal no diretório do projeto e execute:

```

cd backend/



npm i



touch .env

```

<strong> criando as constantes no arquivo .env com os valores referentes ao banco:</strong>

```

echo "DB_USER=<insira_aqui_o_usuário_do_banco_mysql>" >> .env



echo "DB_PASSWORD=<insira_aqui_a_senha_do_banco_mysql>" >> .env



echo "DB_SCHEMA=<insira_aqui_o_schema_do_banco_mysql>" >> .env



node app.js

```

## Running Fronten

Consulte o [README.md](frontend/README.md) no diretório frontend =)
