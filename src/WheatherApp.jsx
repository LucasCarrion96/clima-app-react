import { useState } from 'react'

export const WheatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    /*la urlBase ya no sale en la pagina pero aun funciona*/
    const API_KEY = '09d8fa84480cfe58e93d162d67ecaf49'
    const difKelvin = 273.15


    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)
    const [error, setError] = useState(false);


    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (ciudad.length > 0) fetchClima()
    }

    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            if (!response.ok) {
                throw new Error('La ubicación no se encontró');
            }
            const data = await response.json()
            setDataClima(data)
            setError(false)
        } catch (error) {
            console.error()
            console.log('La ubicación no se encontró')
            setError(true)
        }


    }

    return (
        <>
            {error &&

                <div className="alert alert-danger" role="alert">
                    No se encontro la ubicación. Por favor, inténtalo de nuevo.
                </div>}


            <div className='container'>

                <h1>The World's Climate</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={ciudad}
                        onChange={handleCambioCiudad}
                    />
                    <button type="submit" >Buscar</button>
                </form>
            </div>


            {

                dataClima && (
                    <div>


                        <div className='col d-flex justify-content-center'>
                            <div className="card text-bg-primary" >
                                <div className="card-body text-start">
                                    <h5 className="card-title">{dataClima.name}</h5>
                                    <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />
                                    <p> {dataClima.weather[0].description}</p>
                                    <p>Temp: {parseInt(dataClima?.main?.temp - difKelvin)}ºC / Hum: {parseInt(dataClima?.main?.humidity)}%</p>

                                    {(dataClima?.wind?.gust) > 0
                                        ?
                                        <p className="">
                                            <h5 className="card-title">Wind</h5>
                                            Vel:{(dataClima?.wind?.speed)}<br></br>
                                            Deg:{(dataClima?.wind?.deg)}<br></br>
                                            Gust:{(dataClima?.wind?.gust)}
                                        </p>

                                        :
                                        <p className="">
                                            <h3>Wind</h3>
                                            Vel:{(dataClima?.wind?.speed)}<br></br>
                                            Deg:{(dataClima?.wind?.deg)}<br></br>
                                        </p>
                                    }
                                    <p className="">
                                        Lat: {(dataClima?.coord?.lat)}
                                    </p>
                                    <p className="">
                                        Lon: {(dataClima?.coord?.lon)}
                                    </p>
                                </div>
                            </div>
                        </div>






                    </div >
                )
            }





        </>
    )
}
