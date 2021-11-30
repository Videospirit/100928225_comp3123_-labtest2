import React, { Component, Fragment } from 'react'
import axios from 'axios'

export default class Weather extends Component {
    //Define state default values
    state = {
        forcast: [],
        weather: [],
        date: ''
    }

     //Component Lifecycle Callback
    componentDidMount() {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=a4032c95b4486446569f8f2220462af9`)
        .then(res => {
            console.log(res.data);
            const forcast = res.data;
            const weather = res.data.weather;
            const date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(res.data.ts);
            this.setState({ forcast });
            this.setState({ weather });
            this.setState({date})

        })
    }

    render() {
        return (
            <div>
                <h1>Labtest 2
                </h1>
                <table>
                    <tbody>
                        {
                this.state.weather.map(condition =>(
                    <Fragment key={condition.id}>
                        <tr>
                            <td>This is the weather for {this.state.forcast.name}<br/> {this.state.date}</td>
                            <td>{Math.round(this.state.forcast.main.temp-273.15)}°C</td>
                        </tr>
                        <tr>
                            <td>
                                <img src={`http://openweathermap.org/img/wn/`+ condition.icon + '@2x.png'} alt="weather"/>
                            </td>
                            <td>
                                Weather is {condition.description} today
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Feels Like:{Math.round(this.state.forcast.main.feels_like-273.15)}°C <br/>
                                Min: {Math.round(this.state.forcast.main.temp_min-273.15)}°C<br/>
                                Max: {Math.round(this.state.forcast.main.temp_max-273.15)}°C<br/>
                                Airpressure: {this.state.forcast.main.pressure}hPa<br/>
                                Humidity: {this.state.forcast.main.humidity}%<br/>
                                Visibility: {this.state.forcast.visibility}<br/>
                            </td>
                            <td>
                                Wind Speed: {this.state.forcast.wind.speed}m/s <br/>
                                Wind Direction: {this.state.forcast.wind.deg}° <br/>
                                Wind Gusts: {this.state.forcast.wind.gust}m/s <br/>
                                Sunrise:{Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(this.state.forcast.sys.sunrise)}<br/>
                                Sunset:{Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(this.state.forcast.sys.sunset)}<br/>
                            </td>
                        </tr>

            


                        
                    </Fragment>
               ))
                }
                    </tbody>
                </table>      
                       
            </div>
                )
    }
}
