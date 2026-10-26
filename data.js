const D={
factos:[["10,6 milhões","habitantes (aprox.)"],["Lisboa","capital"],["Português","língua oficial"],["Euro (€)","moeda"],["112","emergência"],["25 de Abril de 1974","Revolução dos Cravos"]],
secoes:[
{id:"regioes",t:"Regiões turísticas",p:"As sete grandes regiões do país, cada uma com um caráter próprio.",c:[
{n:"Norte",d:"Porto, Vale do Douro, Minho e Gerês. Vinho, granito, cidades históricas e o Parque Nacional.",t:"Porto · Braga · Guimarães · Viana do Castelo"},
{n:"Centro",d:"Coimbra e sua universidade, Aveiro, serras da Estrela, praias de surf e aldeias de xisto.",t:"Coimbra · Aveiro · Nazaré · Serra da Estrela"},
{n:"Área Metropolitana de Lisboa",d:"Capital, Sintra, Cascais e a Costa da Caparica. Maior mercado de trabalho do país.",t:"Lisboa · Sintra · Cascais · Setúbal"},
{n:"Alentejo",d:"Planícies, sobreiros, vinhos, vilas muralhadas e a costa Vicentina, ainda pouco povoada.",t:"Évora · Elvas · Monsaraz · Comporta"},
{n:"Algarve",d:"Sul do país, com praias, falésias, golfe e clima ameno quase o ano todo.",t:"Faro · Lagos · Tavira · Albufeira"},
{n:"Açores",d:"Região autónoma de nove ilhas vulcânicas, com lagoas, termas e observação de baleias.",t:"São Miguel · Pico · Terceira"},
{n:"Madeira",d:"Região autónoma com levadas, falésias e festas, e o Porto Santo, de praia extensa.",t:"Funchal · Porto Santo"}]},
{id:"administracao",t:"Divisão político-administrativa",p:"Como o país se organiza, do nível nacional ao local.",c:[
{n:"Estado unitário, república semipresidencialista",d:"O Presidente é eleito por voto direto. O Governo responde perante a Assembleia da República."},
{n:"Distritos",d:"18 distritos no continente, usados em contextos históricos e administrativos."},
{n:"Regiões autónomas",d:"Açores e Madeira têm governo e parlamento próprios."},
{n:"Concelhos (municípios)",d:"308 municípios, governados por câmara municipal e assembleia municipal."},
{n:"Freguesias",d:"Mais de 3 mil, o nível mais próximo do cidadão, com junta e assembleia de freguesia."},
{n:"Comunidades intermunicipais",d:"Agrupam municípios para cooperação em transportes, saúde e desenvolvimento."}]},
{id:"orgaos",t:"Órgãos públicos e suas funções",p:"Quem faz o quê. Uma primeira lista, que será ampliada.",c:[
{n:"Presidente da República",d:"Chefe de Estado. Promulga leis, nomeia o Primeiro-Ministro e pode dissolver o parlamento.",u:"https://www.presidencia.pt"},
{n:"Assembleia da República",d:"Parlamento. Aprova leis, o Orçamento e fiscaliza o Governo.",u:"https://www.parlamento.pt"},
{n:"Governo",d:"Conduz a política geral e administra o país, com Primeiro-Ministro e ministros.",u:"https://www.portugal.gov.pt"},
{n:"Tribunal Constitucional",d:"Verifica se as leis respeitam a Constituição.",u:"https://www.tribunalconstitucional.pt"},
{n:"Provedor de Justiça",d:"Recebe queixas de cidadãos contra a administração pública.",u:"https://www.provedor-jus.pt"},
{n:"AIMA",d:"Agência para a Integração, Migrações e Asilo. Trata de vistos, autorizações de residência e imigração.",u:"https://aima.gov.pt"},
{n:"Autoridade Tributária (Finanças)",d:"Impostos, NIF e declaração de IRS.",u:"https://www.portaldasfinancas.gov.pt"},
{n:"Segurança Social",d:"Contribuições, NISS, subsídios e reformas.",u:"https://www.seg-social.pt"},
{n:"Serviço Nacional de Saúde (SNS)",d:"Saúde pública. Inscrição no centro de saúde e número de utente.",u:"https://www.sns.gov.pt"},
{n:"IEFP",d:"Instituto do Emprego e Formação Profissional. Vagas, formação e apoios.",u:"https://www.iefp.pt"}]},
{id:"castelos",t:"Castelos",p:"Alguns dos mais visitados. Haverá mapa e mais castelos nas próximas fases.",c:[
{n:"Castelo de São Jorge",d:"Sobre Lisboa, com vista para o Tejo.",t:"Lisboa"},
{n:"Castelo de Guimarães",d:"Ligado à fundação da nacionalidade.",t:"Guimarães"},
{n:"Castelo dos Mouros",d:"Muralhas medievais na serra de Sintra.",t:"Sintra"},
{n:"Castelo de Óbidos",d:"Vila inteira dentro das muralhas.",t:"Óbidos"},
{n:"Castelo de Almourol",d:"Numa ilha do rio Tejo, acessível por barco.",t:"Vila Nova da Barquinha"},
{n:"Castelo de Marvão",d:"Aldeia fortificada no alto da serra de São Mamede.",t:"Marvão"},
{n:"Castelo de Silves",d:"Grande fortaleza de arenito vermelho no Algarve.",t:"Silves"},
{n:"Castelo de Monsaraz",d:"Vila medieval com vista para o lago Alqueva.",t:"Reguengos de Monsaraz"}]},
{id:"aeroportos",t:"Aeroportos",p:"Os principais pontos de chegada.",c:[
{n:"Lisboa (LIS)",d:"Humberto Delgado. O maior do país.",t:"Lisboa"},
{n:"Porto (OPO)",d:"Francisco Sá Carneiro. Porta de entrada do Norte.",t:"Maia"},
{n:"Faro (FAO)",d:"Principal aeroporto do Algarve.",t:"Faro"},
{n:"Funchal (FNC)",d:"Cristiano Ronaldo. Madeira.",t:"Funchal"},
{n:"Ponta Delgada (PDL)",d:"João Paulo II. Maior aeroporto dos Açores.",t:"São Miguel"},
{n:"Porto Santo (PXO)",d:"Voos para a Madeira e voos locais.",t:"Porto Santo"}]},
{id:"midia",t:"TV e mídia",p:"Canais para acompanhar notícias e programação do país. Youtubers e influencers entram numa fase posterior.",c:[
{n:"RTP1 e RTP2",d:"Serviço público de televisão.",u:"https://www.rtp.pt"},
{n:"RTP3",d:"Canal de notícias da RTP.",u:"https://www.rtp.pt"},
{n:"SIC e SIC Notícias",d:"Canal privado generalista e de notícias.",u:"https://sic.pt"},
{n:"TVI e CNN Portugal",d:"Canal privado generalista e de notícias.",u:"https://tvi.iol.pt"},
{n:"CMTV",d:"Canal de notícias do grupo Cofina.",u:"https://www.cmjornal.pt"}]},
{id:"vida",t:"Vida prática",p:"Primeiros passos de quem muda para Portugal. Regras mudam, então confirme nos sites oficiais.",c:[
{n:"Portal ePortugal",d:"Porta de entrada dos serviços públicos online.",u:"https://eportugal.gov.pt"},
{n:"NIF",d:"Número de identificação fiscal. Necessário para contrato de casa, conta e trabalho.",u:"https://www.portaldasfinancas.gov.pt"},
{n:"NISS",d:"Número de identificação na Segurança Social.",u:"https://www.seg-social.pt"},
{n:"Número de utente (SNS)",d:"Inscrição no centro de saúde da sua área.",u:"https://www.sns.gov.pt"},
{n:"Residência e vistos",d:"Pedidos junto da AIMA.",u:"https://aima.gov.pt"},
{n:"Dados abertos",d:"Dados públicos do Estado.",u:"https://dados.gov.pt"}]},
{id:"trabalho",t:"Trabalho e imóveis",p:"Por enquanto são atalhos. A busca automática de vagas e os anúncios chegam em fases futuras.",c:[
{n:"IEFP: ofertas de emprego",d:"Vagas do serviço público de emprego.",u:"https://www.iefp.pt"},
{n:"Net-Empregos",d:"Portal de vagas em Portugal.",u:"https://www.net-empregos.com"},
{n:"Idealista",d:"Imóveis para comprar e arrendar.",u:"https://www.idealista.pt"},
{n:"Imovirtual",d:"Imóveis para comprar e arrendar.",u:"https://www.imovirtual.com"}]}
]};
