import {Component} from 'react'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import './App.css'

const Container = styled.div`
    min-height:100vh;
    background-color:#eef4f7;
    display:flex;
    flex-direction:column;
    align-items:center;
    row-gap:2.5rem;

    padding:3rem 3rem;
`

const Title = styled.h1`
  font-size:3rem;
  align-items:center;
  border-bottom: 3px solid steelblue;
  padding-bottom:1rem;
`

const TravelListContainer = styled.ul`
  display:flex;
  flex-wrap:wrap;
  row-gap:1.5rem;
  justify-content:space-between;
  width:50%;
`

const TravelListItem = styled.li`
  display:flex;
  flex-direction:column;
  row-gap:1rem;
  width:49%;
  background-color:white;
  padding-bottom:1rem;
  padding-left:1rem;
  padding-right:1rem;
`

const Image = styled.img`

  width:100%;
  height:20rem;
  object-fit:cover;
  object-position:center;
`

const Name = styled.h1`
  font-size:1.8rem;

  color:darkblue;

`

const Description = styled.p`

  font-size:1.6rem;
  color:grey;
`

const LoaderContainer = styled.div`
  height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
`

// Replace your code here

class App extends Component {
  state = {
    showLoader: true,
    travelList: [],
  }

  componentDidMount() {
    this.fetchData()
  }

  onSuccessFetchData = data => {
    const formattedData = data.map(each => ({
      id: each.id,
      name: each.name,
      imageUrl: each.image_url,
      description: each.description,
    }))

    this.setState({travelList: formattedData, showLoader: false})
  }

  fetchData = async () => {
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const option = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, option)
    const data = await response.json()

    if (response.ok) {
      console.log(response)
      this.onSuccessFetchData(data.packages)
    }
  }

  onRenderTravelListContainer = () => {
    const {travelList} = this.state

    return (
      <TravelListContainer>
        {travelList.map(each => (
          <TravelListItem key={each.id}>
            <Image src={each.imageUrl} alt={each.name} />
            <Name>{each.name}</Name>
            <Description>{each.description}</Description>
          </TravelListItem>
        ))}
      </TravelListContainer>
    )
  }

  onRenderLoader = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </LoaderContainer>
  )

  render() {
    const {showLoader} = this.state

    return (
      <Container>
        <Title>Travel Guide</Title>
        {showLoader
          ? this.onRenderLoader()
          : this.onRenderTravelListContainer()}
      </Container>
    )
  }
}

export default App
