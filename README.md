# App-Masters

Projeto realizado como parte de seleção do App-Masters https://www.appmasters.io/pt/sobre.
Vaga pretendida: Backend

#Intruções para rodar o projeto

git clone no repositorio

cd na pasta do repositorio

yarn/npm install - para instalar as depedencias

dentro do arquivo .env deve se adicionar uma string com as informações do database utilizado
Ex: DATABASE_URL="bancoUsado(postgress,mysql,etc...)://user:password@host:port/database?schema=public"


npx prisma migrate dev para rodar as migrations que vão criar as tabelas no seu banco de dados

yarn dev/npm run dev - para rodar o projeto
porta da aplicação: 3242

yarn test/ npm run test - para rodar o teste

OBSERVAÇÕES: 
A camada de repository foi criada para implementar a injeção de depedencia nos casos de uso, além de me da a chance de rodar os teste com conexão de banco em memória e a liberdade de poder de trocar de database mais facilmente.
Com isso eu tenho as intefaces IDonation, IUsers que servem para que nos casos de uso eu receba parametros desse tipo e na hora que eu implemento a chamada do useCase na sua devida rota eu instancio qual repositorio de comunicação com o BD eu vou usar.

A class AppError é um erro customizado para eu conseguir retornar o requiredFields mais facilmente

#Rotas do projeto:

get "/"<br>
Exemplo de resposta:<br>
{alive:true}<br><br>
post "/donation"<br>
Exemplo de requisição:<br>
{<br>
    name,<br>
    email,<br>
    phone,<br>
    zip,<br>
    city,<br>
    state,<br>
    streetAddress,<br>
    number,<br>
    complement,<br>
    neighborhood,<br>
    deviceCount,<br>
    devices: [<br>
        {type, condition},<br>
        {type, condition},<br>
        ...<br>
    ]<br>
}<br><br>
Exemplos de resposta:<br>
{"sucess": true}<br/>,
    {<br>
    "error": true,<br>
    "errorMessage": "A quantidade de equipamentos (3) não está de acordo com as informações de equipamentos enviados (4)"<br>
    },<br>
    {<br>
   "error": true,<br>
   "errorMessage": "Todos os campos obrigatórios devem ser informados:",<br>
    "requiredFields": [<br>
    "phone"<br>
    ]<br>
    }<br>
    {<br>
    "error": true,<br>
    "errorMessage": "Email inválido"<br>
    }<br>

<br>
get "donation"<br>
Exemplo de reposta:<br>
[<br>
	{<br>
		"id": "0a6e53fc-df0e-45e1-af22-13351ddfdc71",<br>
		"zip": "39404404",<br>
		"city": "montes claros",<br>
		"state": "minas fgerais",<br>
		"streetAdress": "rua b",<br>
		"number": "490",<br>
		"complement": "casa",<br>
		"neightborhood": "santos dumont",<br>
		"deviceCount": 2,<br>
		"createdAt": "2022-08-07T22:14:07.930Z",<br>
		"user": {<br>
			"name": "mattheus",<br>
			"email": "mateca500@gmail.com",<br>
			"phone": "(38)3213-1291"<br>
		},<br>
		"Devices": [<br>
			{<br>
				"type": "notebook",<br>
				"condition": "working"<br>
			},<br>
			{
				"type": "desktop",<br>
				"condition": "notWorking"<br>
			}<br>
		]<br>
	},<br>
	{<br>
		"id": "62991783-34ce-43ce-947b-c65f0be0649f",<br>
		"zip": "39404404",<br>
		"city": "montes claros",<br>
		"state": "minas fgerais",<br>
		"streetAdress": "rua b",<br>
		"number": "490",<br>
		"complement": "casa",<br>
		"neightborhood": "santos dumont",<br>
		"deviceCount": 2,<br>
		"createdAt": "2022-08-07T22:13:05.030Z",<br>
		"user": {<br>
			"name": "mattheus",<br>
			"email": "mateca500@gmail.com",<br>
			"phone": "(38)3213-1291"<br>
		},<br>
		"Devices": [<br>
			{<br>
				"type": "notebook",<br>
				"condition": "working"<br>
			},<br>
			{<br>
				"type": "desktop",<br>
				"condition": "notWorking"<br>
			}<br>
		]<br>
	},<br>
	{<br>
		"id": "9094bc76-08be-45f0-99e4-f513debe02b0",<br>
		"zip": "39404404",<br>
		"city": "montes claros",<br>
		"state": "minas fgerais",<br>
		"streetAdress": "rua b",<br>
		"number": "490",<br>
		"complement": "casa",<br>
		"neightborhood": "santos dumont",<br>
		"deviceCount": 2,<br>
		"createdAt": "2022-08-07T22:11:54.653Z",<br>
		"user": {<br>
			"name": "mattheus",<br>
			"email": "mateca500@gmail.com",<br>
			"phone": "(38)3213-1291"<br>
		},<br>
		"Devices": [<br>
			{<br>
				"type": "notebook",<br>
				"condition": "working"<br>
			},<br>
			{<br>
				"type": "desktop",<br>
				"condition": "notWorking"<br>
			}<br>
		]<br>
	},<br>
	{<br>
		"id": "0e51b315-ea54-4a33-96a1-60bbf90e70ca",<br>
		"zip": "39404404",<br>
		"city": "montes claros",<br>
		"state": "minas fgerais",<br>
		"streetAdress": "rua b",<br>
		"number": "490",<br>
		"complement": "casa",<br>
		"neightborhood": "santos dumont",<br>
		"deviceCount": 2,<br>
		"createdAt": "2022-08-07T22:07:15.650Z",<br>
		"user": {<br>
			"name": "mattheus",<br>
			"email": "mateca500@gmail.com",<br>
			"phone": "(38)3213-1291"<br>
		},<br>
		"Devices": [<br>
			{<br>
				"type": "notebook",<br>
				"condition": "working"<br>
			},<br>
			{<br>
				"type": "desktop",<br>
				"condition": "notWorking"<br>
			}<br>
		]<br>
	},<br>
	{<br>
		"id": "df5cec02-c4c2-450e-abf0-c0479cd40cd8",<br>
		"zip": "39404404",<br>
		"city": "montes claros",<br>
		"state": "minas fgerais",<br>
		"streetAdress": "rua b",<br>
		"number": "490",<br>
		"complement": "casa",<br>
		"neightborhood": "santos dumont",<br>
		"deviceCount": 2,<br>
		"createdAt": "2022-08-07T22:06:36.568Z",<br>
		"user": {<br>
			"name": "mattheus",<br>
			"email": "mateca500@gmail.com",<br>
			"phone": "(38)3213-1291"<br>
		},<br>
		"Devices": [<br>
			{<br>
				"type": "notebook",<br>
				"condition": "working"<br>
			},<br>
			{<br>
				"type": "desktop",<br>
				"condition": "notWorking"<br>
			}<br>
		]<br>
	},<br>
	{<br>
		"id": "39911352-a0a4-4e39-b3f7-a0ef8bc011f6",<br>
		"zip": "14730-000",<br>
		"city": "Monte Azul Paulista",<br>
		"state": "SP",<br>
		"streetAdress": "Praca Rio Branco Centro",<br>
		"number": "213",<br>
		"complement": "213",<br>
		"neightborhood": "centro",<br>
		"deviceCount": 1,<br>
		"createdAt": "2022-08-07T21:37:32.649Z",<br>
		"user": {<br>
			"name": "PAULO GUSTAVO ROSSI",<br>
			"email": "paulogustavorossi@gmail.com",<br>
			"phone": "17981350990"<br>
		},<br>
		"Devices": [<br>
			{
				"type": "desktop",<br>
				"condition": "notWorking"<br>
			}<br>
		]<br>
	},<br>
	{<br>
		"id": "12a636a4-9fe1-4305-8738-46ce9808fc08",<br>
		"zip": "39404502",<br>
		"city": "Montes Claros",<br>
		"state": "MG",<br>
		"streetAdress": "Rua A",<br>
		"number": "120",<br>
		"complement": "",<br>
		"neightborhood": "Vila Castelo Branco",<br>
		"deviceCount": 6,<br>
		"createdAt": "2022-08-07T21:30:42.013Z",<br>
		"user": {<br>
			"name": "luan",<br>
			"email": "luan@dev.io",<br>
			"phone": "38999550838"<br>
		},<br>
		"Devices": [<br>
			{<br>
				"type": "notebook",<br>
				"condition": "working"<br>
			},<br>
			{<br>
				"type": "desktop",<br>
				"condition": "notWorking"<br>
			},<br>
			{<br>
				"type": "netbook",<br>
				"condition": "notWorking"<br>
			},<br>
			{<br>
				"type": "screen",<br>
				"condition": "working"<br>
			},<br>
			{<br>
				"type": "printer",<br>
				"condition": "working"<br>
			},<br>
			{<br>
				"type": "scanner",<br>
				"condition": "working"<br>
			}<br>
		]<br>
	},<br>
	{
		"id": "2891f5cd-eb85-4cef-aac3-7ca2f436e026",<br>
		"zip": "39400570",<br>
		"city": "belo horizonte",<br>
		"state": "mg",<br>
		"streetAdress": "rua dos machados",<br>
		"number": "12",<br>
		"complement": "casa",<br>
		"neightborhood": "santos dumont",<br>
		"deviceCount": 4,<br>
		"createdAt": "2022-08-07T21:23:03.244Z",<br>
		"user": {<br>
			"name": "lui",<br>
			"email": "lucas@dev.io",<br>
			"phone": "38999887766"<br>
		},<br>
		"Devices": [<br>
			{<br>
				"type": "screen",<br>
				"condition": "working"<br>
			},<br>
			{<br>
				"type": "scanner",<br>
				"condition": "working"<br>
			},<br>
			{<br>
				"type": "netbook",<br>
				"condition": "working"<br>
			},<br>
			{<br>
				"type": "notebook",<br>
				"condition": "notWorking"<br>
			}<br>
		]<br>
	}<br>
]<br>


