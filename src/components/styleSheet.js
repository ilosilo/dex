export const GlobalStyles = {
  xButton: {
    backgroundColor: 'darkgray',
    height: 30,
    display: 'flex',
    margin: 10,
    cursor: 'pointer',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: 30,
    border: 'solid #050101',
    borderWidth: 3,
    color: 'white',
    borderRadius: 15,
  },

  pokiListItem: {
    backgroundColor: 'white',
    width: 300,
    height: 45,
    margin: 10,
    alignContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 3,
    borderWidth: 2,
    borderColor: 'red',
  },
  searchBox: {
    backgroundColor: 'white',
    width: '90%',
    height: 45,
    margin: 10,
    alignContent: 'center',
    alignSelf: 'center',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 3,
    borderWidth: 2,
    borderColor: 'red',
  },

  pokiInfoCard: {
    height: 550,
    zIndex: 9998,
    position: 'absolute',
    left: 450,
    top: 140,
    backgroundColor: '#e62e62',
    flexDirection: 'column',
    display: 'flex',
    border: 'solid #050101',
    width: 550,
    overflow: 'hidden',
  },

  moveInfoCard:{
    height: 350,
    zIndex: 9997,
    position: 'absolute',
    left: 1000,
    top: 340,
    backgroundColor: '#e62e62',
    flexDirection: 'column',
    display: 'flex',
    border: 'solid #050101',
    width: 350,
    overflowY: 'scroll',
  },

  mainListPage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  nameBox: {
    height: 25,
    width: 90,
    alignSelf: 'center',
    padding: 5,
    marginTop: 5,
    marginRight: 7,
    borderWidth: 3,
    border: 'solid #050101',
    backgroundColor: '#57b57e',
    borderRadius: 8,
  },

  imgBox: {
    margin: 0,
    padding: 0,
    display: 'flex',
    alignSelf: 'center'
  },

  imgFrame: {
    backgroundColor: '#7d736d',
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    width: 230,
    display: 'flex',
    alignContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    flexDirection: 'column',
    border: 'solid #050101',
    alignSelf: 'center',
    borderBottomLeftRadius: 20,
  },
  infoPanel: {
    margin: 12,
    padding: 12,
    backgroundColor: '#6cdf3f',
    borderBottomLeftRadius: 15,
    display: 'flex',
    fontWeight: 'bold',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
    border: '3px solid black'
  },
  label: {
    backgroundColor: 'white',
    height: 30,
    position: 'absolute',
    left: -20, bottom: 0,
    width: '110%'
  },
  playButton: {
    border: '1px solid blue',
    backgroundColor: '#212121',
    border: '3px solid #101010',
    flex: 1,
    cursor: 'pointer',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    padding:0

  },
  language: {
    position:'absolute',
    top:10,
    right: 15,
    border:'1px solid darkgray'
  }
};

export default { GlobalStyles };
