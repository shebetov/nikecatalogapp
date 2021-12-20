import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { ListItem, SearchBar, Image, Avatar } from 'react-native-elements';

class FlatListDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const url = `https://wbxcatalog-sng.wildberries.ru/men_shoes/catalog?locale=by&lang=ru&curr=rub&kind=1&subject=104;105;128;130;232;396;1382;1586&sort=popular&page=1&fbrand=671`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        let item = res.data.products[0];
        this.setState({
          data: res.data.products,
          error: null,
          loading: false,
        });
        this.arrayholder = res.data.products;
      })
      .catch(error => {
        this.setState({ error, loading: false });
        Alert.alert('Не удалось получить данные');
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = item.name.toUpperCase() + ' ' + item.brand.toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Поиск..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem>
              <Avatar styles={{ width: 100, height: 100 }} source={{ uri: 'https://kemlenvg8e.a.trbcdn.net/c516x688/new/'+ (Math.floor(item.id / 10000 | 0) * 10000).toString() +'/' + item.id.toString() + '-1.jpg' }} />
              <ListItem.Content>
                <ListItem.Title>{`${item.name} / ${item.brand} - ${(item.priceU / 100).toString()} руб.`}</ListItem.Title>
                <ListItem.Subtitle>{item.id.toString()}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

export default FlatListDemo;
