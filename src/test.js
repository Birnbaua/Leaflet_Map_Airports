
        {this.state.airports.map(a => 
            (<Marker position={[this.state.airports.lat,this.state.airports.long]} icon={myIcon}>
                <Popup>
                   Airport: {this.state.airports.name} <br /> Average Departure Delay:{this.state.airports.departureDelay}
                </Popup>
            </Marker>)
        )}


        <Marker position={[a.lat,a.long]} icon={myIcon}>
                <Popup>
                   Airport: {a.name} <br /> Average Departure Delay:
                </Popup>
            </Marker>








        //fetch('https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=select+distinct+%3Fairport+%3Fname+%3Ficaocode+%3Flat+%3Flong%0D%0A++++++++++++where+%7B%0D%0A++++++++++++%3Fairport+dbo%3AicaoLocationIdentifier+%3Ficaocode.%0D%0A++++++++++++%3Fairport+geo%3Alat+%3Flat.%0D%0A++++++++++++%3Fairport+geo%3Along+%3Flong.%0D%0A++++++++++++%3Fairport+foaf%3Aname+%3Fname.%0D%0A++++++++++++FILTER+regex%28%3Ficaocode%2C+%22%5E....%24%22%29%7D%0D%0A++++++++++++order+by+asc%28%3Ficaocode%29+LIMIT+100&format=application%2Fsparql-results%2Bjson&CXML_redir_for_subjs=121&CXML_redir_for_hrefs=&timeout=30000&debug=on&run=+Run+Query+')
        var dbPedia = 'https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=';
        var container = 'http://192.168.99.100:4040/rdf/sparql?query=';

        var airportsA_R = `Select distinct ?icaocode ?name ?lat ?long
        Where {
            ?airport dbo:icaoLocationIdentifier ?icaocode.
            ?airport geo:lat ?lat.
            ?airport geo:long ?long.
            ?airport foaf:name ?name.
            FILTER regex(?icao, "^....$").
            FILTER regex(?icao, "^[A-R]") 
        }
        order by asc(?icao)`;
        
        var airportsS_Z = `Select distinct ?icaocode ?name ?lat ?long
        Where {
            ?airport dbo:icaoLocationIdentifier ?icaocode.
            ?airport geo:lat ?lat.
            ?airport geo:long ?long.
            ?airport foaf:name ?name.
            FILTER regex(?icao, "^....$").
            FILTER regex(?icao, "^[S-Z]") 
        }
        order by asc(?icao)`;

        var departureDelay = `Prefix cont: <http://www.jku.at/dke/semcon/departuredelays#> 
        Select distinct ?origin (AVG( minutes(?depDelay)) AS ?delay)
        Where {
            ?flight cont:hasOrigin ?origin.
            ?flight cont:hasDepartureDelay ?depDelay
        }
        Group By ?origin 
        Order By desc(?delay)`

        var format = "&format=application/json";

        //get all airports
        const urls = [
            dbPedia + encodeURI(airportsA_R) + encodeURI(format),
            dbPedia + encodeURI(airportsS_Z) + encodeURI(format)
          ];
          Promise.all(
            urls.map(url =>
              fetch(url)
                .then(res => res.json())
                .then(res => res.results.bindings)
            )
          )
            .then(results => {
              return [].concat(...results);
            })
            .then(results =>
              results.map(x => {
                return {
                  icao: x.icao.value.split("/").slice(-1)[0],
                  airport: x.airport.value.split("/").slice(-1)[0],
                  country: x.country.value.split("/").slice(-1)[0],
                  name: x.name.value.split("/").slice(-1)[0]
                };
              })
            )
            .then(results => {
              this.setState({ airports: results });
            });


















            {(<Marker position={[airportMap[airportDelay.icao].lat,airportMap[airportDelay.icao].long]} icon={myIcon}>
                <Popup>
                   Airport: {airportMap[airportDelay.icao].name} with ICAO Code: {airportMap[airportDelay.icao].icao} <br /> Average Departure Delay: 
                   {Object.keys(airportMap).map( x =>
                        airportMap[airportDelay.icao]
                   )}
                </Popup>
            </Marker>)}