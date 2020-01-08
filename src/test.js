
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