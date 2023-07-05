import requests

url = "https://trueway-directions2.p.rapidapi.com/FindDrivingRoute"

querystring = {"stops":"31.952395508349124, 34.81720724844795; 31.96573768773018, 34.830073891069524; 31.94870423431, 34.817332729748486; 31.950297781672457, 34.81768829472784; 31.96322551046745, 34.831318436107374",
               "optimize": "true"}

headers = {
	"X-RapidAPI-Key": "22e69565e9msh0b238020c0d2939p11c95ejsn69d61a302b57",
	"X-RapidAPI-Host": "trueway-directions2.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())