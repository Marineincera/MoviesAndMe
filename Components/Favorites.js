import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import FilmsList from './FilmsList'

class Favorites extends React.Component {

  render() {
    return (
     <FilmsList
      films={this.props.favoritesFilm}
      navigation={this.props.navigation}
      favoriteList={true}
     />
    )
  }
}

const styles = StyleSheet.create({})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Favorites)