import moment from 'moment'
import numeral from 'numeral'
import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {getFilmDetailFromApi, getImageFromApi} from '../API/TMDBApi'

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

  _displayFilm(){
    console.log(this.state.film);
    const {film} = this.state
    if(this.film != undefined){
      return(
        <ScrollView style={styles.scrollview_container}>
        <Image
          style={styles.image}
          source={{uri: getImageFromApi(this.film.poster_path)}}
        />
        <Text style={styles.title}>{this.film.title}</Text>
        <Text style={styles.overview}>{this.film.overview}</Text>
      <Text style={styles.infos}>Sorti le {moment(new Date(this.film.release_date)).format('DD/MM/YYYY')}</Text>
      <Text style={styles.infos}>Note: {this.film.vote_average}</Text>
      <Text style={styles.infos}>Nombre de vote {this.film.vote_count}</Text>
      <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
      <Text style={styles.infos}>Genre(s) :
        {this.film.genres.map(function(genre){
          return genre.name;}).join("/")
        } 
      </Text>
      <Text style={styles.infos}>Companie(s): {this.film.production_companies.map(function(companie){return companie.name;}).join("/")}</Text>
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

  render() {
    const idFilm = this.props.route.params.idFilm;
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  title: {
    fontSize: 30,
    flex: 1,
    textAlign: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
    marginTop: 10
    
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
    width: 400,
    height: 180,
    margin: 5,
  },
  overview: {
    fontStyle: 'italic',
    marginBottom: 10
  }
})




export default FilmDetail