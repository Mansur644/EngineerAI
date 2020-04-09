import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { isType } from '@babel/types';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
    }

    componentDidMount() {
        fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0')
            .then(response => response.json())
            .then((response) => {
                this.setState({
                    dataSource: response
                })
            })
            .catch((error) => {
                return error;
            })
    }

    _keyExtractor = (item, index) => item.id;

    renderItem = (item, index) => {
        console.log('***11', JSON.stringify(item))
        return (
            <View style={{ marginLeft: 10, padding: 10 }}>
                <TouchableOpacity onPress={() => { this.handleItem(item) }}>
                    <Text>{item.item.title}</Text>
                    <Text>{item.item.body}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    handleItem(item) {
       this.props.navigation.navigate('DetailsScreen', {rowItems: item})
    }



    ListViewItemSeparator = () => {
        return (
            <View
                style={{ height: 0.5, width: '100%', backgroundColor: '#606070' }}
            />
        );
    };




    render() {
        console.log('***', JSON.stringify(this.state.dataSource))
        return (
            <View style={{ flex: 1 }}>

                <FlatList
                    data={this.state.dataSource}
                    renderItem={(item, index) => this.renderItem(item, index)}
                    keyExtractor={this._keyExtractor}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                />

            </View>
        )
    }
}

export default App;