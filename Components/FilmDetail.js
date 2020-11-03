import React from 'react'
import { StyleSheet, Share, View, Text, ActivityIndicator, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import {getFilmDetailFromApi, getImageFromApi} from '../API/TMDBApi'
import{ Icon } from 'react-native-elements';
import Enlarge from '../Animations/Enlarge'

class FilmDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      film: undefined,
      isLoading: true
    }
    
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _toggleFavorite() {
    const action = {type: "TOGGLE_FAVORITE", value: this.state.film}
    this.props.dispatch(action)
  }


  _displayFavoriteIcon(){
    var shouldEnlarge = false
    var color = '#BCBABA'
    if(this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1){
      color = '#F91111'
      shouldEnlarge = true
    }
    return (
      <Enlarge
        shouldEnlarge={shouldEnlarge}>
        <Icon 
        name= 'favorite'
        color={color}
        />
      </Enlarge>
    )
    
  }

  _shareFilm(){
    const {film} = this.state
    Share.share({title: film.title, message: film.overview})
  }

  _displayFloatingActionButton(){
    const {film} = this.state
    return(
      <TouchableOpacity
        style={styles.share_touchable_floatingactionbutton}
        onPress={() => this._shareFilm()}>
         <Icon 
          name ='send'
          />

      </TouchableOpacity>
    )
  }

  _displayFilm(){
    console.log(this.state.film);
    console.log(this.props);
    if(this.state.film != undefined){
      return(
        <ScrollView style={styles.scrollview_container}>
        <Image
          style={styles.image}
          source={{uri: getImageFromApi(this.state.film.poster_path)}}
        />
        <Text>{this.state.film.title}</Text>
        <TouchableOpacity onPress={() => this._toggleFavorite()}>{this._displayFavoriteIcon()}</TouchableOpacity>
        <Text>{this.state.film.overview}</Text>
      <Text>Sorti le {this.state.film.release_date}</Text>
      <Text>Note: {this.state.film.vote_average}</Text>
      <Text>Nombre de vote {this.state.film.vote_count}</Text>
      <Text>Genre(s) :
        {this.state.film.genres.map(function(genre){
          return genre.name;}).join("/")
        } 

      </Text>
        </ScrollView>
      )
    }
  }



  componentDidMount(){
    getFilmDetailFromApi(this.props.route.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      })
    })
  }

  componentDidUpdate() {
    console.log('componentDidUpdate: ');
    console.log((this.props.favoritesFilm));
  }
  

  render() {
    const idFilm = this.props.route.params.idFilm;
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
        {this._displayFloatingActionButton()}
      </View>
    )
  }
}



const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
  },
  share_touchable_floatingactionbutton: {
    width: 60,
    height: 60,
    bottom: 30,
},
  icon:{
    flex:1,
    size: 0
  }
})

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action)}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FilmDetail)