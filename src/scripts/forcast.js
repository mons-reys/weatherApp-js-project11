

class Weather{
    constructor(key){
        this.key = key;
    }

    init(){

        //get the city details (retrun a promise)
        const cityDetails = this.getCity('manchester')
            .then(data =>{
                
                return data;
            })
            .catch(err =>{
                console.log(err);
            }) 
            
        //get the city weather using the cityDetails promise              
        cityDetails.then(data =>{
            this.getWeather(data.Key).then(data =>{
                console.log(data);
            })
        })
    
    }



    async getCity(city){
        const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        const query = `?apikey=${this.key}&q=${city}`;


        const response = await fetch(base + query);
        if(response.status !== 200){
            throw new Error('can not found the data');
        }
        const data = await response.json();


        return data[0]
    }

    async getWeather(id){
        const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
        const query = `${id}?apikey=${this.key}`;
    
        const response = await fetch(base + query);
        const data = await response.json();


        return data[0];
    }
}

export{Weather as default};