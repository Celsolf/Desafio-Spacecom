O código foi separado em funções para facilitar a leitura, a manutenção e a organização das responsabilidades de cada etapa. Fora o uso de `Map`, foram utilizadas funções simples, pois não considerei necessário adotar estruturas mais complexas para resolver o problema.

A IA foi utilizada como apoio para identificar os assuntos que precisavam ser pesquisados e estudados, além de auxiliar em algumas decisões de implementação durante o desenvolvimento. A implementação foi realizada por mim, com esse auxílio, e compreendo o funcionamento do código desenvolvido.z

Para a leitura dos datasets, foi utilizado `createReadStream`, pois o uso de `readFile` na última base de dados retornou um erro devido ao tamanho do arquivo.

Foram padronizadas as conversões dos campos, principalmente dos IDs, para manter os mesmos tipos de dados e evitar inconsistências durante as comparações.

O `Map` foi utilizado para agrupar os registros que possuem o mesmo timestamp, usando esse valor como chave. Dessa forma, os cálculos de distância são realizados somente entre registros do mesmo instante.

Para calcular as distâncias entre as posições, foi utilizada a Fórmula de Haversine, conforme solicitado no desafio.

Ao final, `JSON.stringify` é utilizado para converter os resultados em uma string no formato JSON. Em seguida, essa string é gravada em um arquivo .txt por meio da função responsável pela escrita da saída.

Execução: é necessário ter o Node.js instalado. Com os arquivos do projeto extraídos, crie uma pasta chamada datasets na raiz do projeto e coloque nela o dataset que deseja processar, e então alterar o caminho o arquivo selecionado no início da função `main`.Para executar o programa, abra o terminal na pasta principal do projeto e utilize o comando `node main.js`. A função responsável pela saída pode permanecer igual, sendo recomendável apenas alterar o nome do arquivo de saída para evitar confusões entre os resultados.
