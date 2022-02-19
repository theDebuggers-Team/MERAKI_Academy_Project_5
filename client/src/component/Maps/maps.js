import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

class Demo1 extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      latitude: "0",
      longitude: "0",
    };
  }

  // this.setState({count: this.state.count + 1});

  render() {
    // if ("geolocation" in navigator) {
    //   console.log("geolocation available");
    //   console.log("PROPS: ", this.props);

    //   navigator.geolocation.getCurrentPosition((position) => {
    //     console.log(position);
    //     //   location = position;
    //     // setLat(position.coords.latitude);
    //     // setLong(position.coords.longitude);
    //     this.state.latitude = position.coords.latitude;
    //     this.state.longitude = position.coords.longitude;
    //     console.log(this.state.latitude);
    //   });
    // } else {
    //   console.log("geolocation not available");
    // }
    // console.log("PROPS: ", this.props);
    // console.log(latitude);
    return (
      <div className="map-container">
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: "32.0613551",
            lng: "36.0938242",
          }}
        >
          <Marker onClick={this.onMarkerClick} name={"This is test name"} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDefbz9TCU1s5nXCQVTyqYz2XH6X3ug0LQ",
})(Demo1);
