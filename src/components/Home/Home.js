


getUserHouseholds = () => {
    axios({
        method: 'GET', 
        url: '/api/houshold/all'
    }).then((response) => {
      const action = {type: 'SET_ALL_USER_HOUSEHOLDS', payload: response.data};
      this.props.dispatch(action);
    }).catch((error) => {
        console.log('Error getting user households', error);
    });
}