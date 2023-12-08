# Panda Video

Tarefas a serem cumpridas no desafio:

- [x] Cadastrar conta e usar API Panda Vídeos
- [x] Upload de vídeos de exemplos para consumir na API
- [x] Frontend simples para visualizar os vídeos disponíveis para download e ver vídeos baixados
- [x] Download de vídeo selecionados
- [x] Vídeos acessíveis offline
- [x] Player de vídeo offlline
- [x] Componente para vídeo panda assistir vídeos baixados mesmo quando estão offline

## Decisões

### Streaming adaptativo

Li e reli a documentação do Panda Vídeo. Em todos os testes o recurso hls ou mesmo de thumb não estavam sendo acessíveis, mesmo passando o header com API no componente.

Assim, utilizei webview rodando o próprio player do Panda Vídeo.

Mesmo assim, oferecendo recurso de download.

### Download e Armazenamento

O endpoint de download não permite escolher formato/qualidade. Assim, a abordagem que optei foi baixar para um armazenamento dentro do app (FileSystem) e armazenar a informação com a lista de vídeos salvos (AsyncStorage).

Assim, mesmo na lista de consumo da API, se o vídeo existe offline, já usa o recurso - poupando recursos de streaming

### Arquitetura

- Busquei uma arquitetura modularizada. Deixando cada módulo o mais independente possível.

- Utilizei o React Query + Axios. React Query tem uma estrutura semelhante às consultas de GraphQL. Com hooks e modelos assíncronos. Além de já fazer cache de consulta, evitando consultas desnecessárias e permitir manipulação de cache.

- Utilizei o firebase e integrei com a base de dados (analytics)

- Para fazer aplicação para iOS e Android, escolhi o expo (React-Native). Tanto pela base em Node, quanto para integrar o desenvolvimento e experiência do usuário.

- Para navegação React Navigation. Pelos recursos e performance nos dipositivos móveis
  ![](https://i.ytimg.com/vi/in9SX3enCHU/maxresdefault.jpg)

**One More Thing...**
Com a escolha que fiz, a aplicação está pronta para, com poucas configurações rodar na web - mantendo a mesma interface e experiência do usuário

- Se o usuário estiver offline, o app já abre direto na aba "Archive" - separada para vídeos baixados

- Se o usuário estiver fora do wifi e tenta baixar um vídeo, o app alerta para que o usuário tome a decisão sobre o consumo.

- Para evitar erros ao deletar e cliques indevidos, mesmo com confirmação, só é possível apagar um vídeo na visualização do mesmo.

- A escolha do FileSystem permitiu oferecer feedback pro usuário do processo de download acelera downloads.

### Apagar vídeo baixado

Não estava no requisito da tarefa em si, mas entendo que seja fundamental de uma ferramenta que prevê BAIXAR.

### Requisitos para rodar a aplicação

```
Node ~> 20.4.0
npm ~> 9.7.2
ruby ~> 3.1.2
cocoapods ~> 1.14.2
```

#### API Panda Vídeo

Minha chave foi enviada por e-mail. Precisa ser colocada no arquivo `.env`
no seguinte formato:
`PANDA_API_KEY=XXXXXXXXXXXXXXXXXXXX`

#### Instalando dependências

`yarn install`

#### Rodando a aplicação

`npx expo start`

Isso é tudo pessoal!
![](https://media.giphy.com/media/DD2NmqYhvLiP6/giphy.gif)
