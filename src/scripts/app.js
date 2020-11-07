

class UpdateUI{
    constructor(container, weather){
        //Dom selectors 
        this.weather = weather; 
        this.container = container;
        this.form = container.querySelector('form');
        this.card = container.querySelector('.card');
        this.time = container.querySelector('.time');
        this.icon = container.querySelector('.icon');
        this.details = container.querySelector('.details');
    }

    init(){
        this.form.addEventListener('submit', e =>{
            e.preventDefault();

            //get the city
            const city = this.form.city.value.trim();
            this.form.reset();
            //update the ui
            this.updateCity(city)
                .then(data => this.update(data))
                .catch(err => console.log(err));
        })
    }

    async updateCity(city){
        const cityDetails = await this.weather.getCity(city);
        const weather = await this.weather.getWeather(cityDetails.Key);

        console.log(weather);
        return{
            cityDetails, weather
        }
    }

    update(data){
        const {cityDetails, weather} = data;
        console.log(this.icon);
        
        this.details.innerHTML =
        `<div class="details text-muted text-uppercase text-center ">
            <h5>${cityDetails.EnglishName}</h5>
            <div>${weather.WeatherText}</div>
            <div class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&deg;C </span>
            </div>
        </div>`;

        const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;

        this.icon.setAttribute('src', iconSrc);

        let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

        this.time.setAttribute('src',timeSrc);

        this.card.style.display ='block';

    }
}

export{UpdateUI as default};