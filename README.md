
# Cadastro de carro

**Requisitos Funcionais**

- [ ] Deve ser possível cadastrar um novo carro
- [ ] Deve ser possível listar todas as categorias

**Regras  de negócios**

- [ ] Não deve ser possível cadastrar um carro com uma placa já existente.
- [ ] Não deve ser possível alterar a placa de um carro já cadastrado.
- [ ] o carro deve ser cadastrado, por padrão, com disponibilidade.
- [ ] O usuário responsável pelo cadastro deve ser um admnistrador

# Listagem de carros 

**Requisitos funcionais**

- [ ] Deve ser possível listar todos os carros disponíveis 
- [ ] Deve ser possível listar todos os carros pelo nome da categoria
- [ ] Deve ser possível listar todos os carros pelo nome da marca
- [ ] Deve ser possível listar todos os carros pelo nome do carro

**Regras  de negócios**

- [ ] O usuário não precisa estr logado no sistema

# Cadastro de Especificação no carro

**Requisitos funcionais**

- [ ] deve ser possível cadastrar uma especificação para um carro.
- [ ] deve ser possível listar todas as especificações
- [ ] deve ser possível listar todos os carros

**Regras de Negócios**

- [ ] Não deve ser possível cadastrar uma especificação para um carro  não cadastrado.
- [ ] Não deve ser possível cadastrar um especificação já existente para o mesmo carro.
- [ ] O usuário responsável pelo cadastro deve ser um admnistrador

# Cadastro de imagem do carro

**Requisito funcional**
- [ ] Deve ser possível cadastrar a imagem do carro 
- [ ] Deve ser possível listar todos os carros 

**Requisito não funcional**

- [ ] Utilizar o multer para upload de arquivo.

**Regras de negocios**

- [ ] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- [ ] O usuário responsável pelo cadastro deve ser um admnistrador.

# Aluguel de carro

**Requisito funcional**
- [ ] Deve ser possível cadastrar um aluguél

**Requisito não funcional**

- [ ] Utilizar o multer para upload de arquivo.

**Regras de negocios**

- [ ] O aluguel deve ter duração mínima de 24 hrs.
- [ ] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- [ ] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
