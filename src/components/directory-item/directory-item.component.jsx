import './directory-item.styles.jsx';
import { useNavigate } from 'react-router-dom';
import { BackgroundImage, CategoryBodyContainer, DirectoryItemContainer } from './directory-item.styles.jsx';

const DirectoryItem = ( { category }) =>{
    const { imageUrl, title ,route} = category;
    const navigate = useNavigate();
    const onNavigateHandler = () => {
      navigate(route);
    }
    return(
        <DirectoryItemContainer onClick={onNavigateHandler}>
                {/* <img style = {{backgroundImage:`url(${imageUrl})`}}/> */}
                  <BackgroundImage imageUrl={imageUrl}/>
                  <CategoryBodyContainer>
                    <h2>{title}</h2>
                    <p>Shop Now</p>
                  </CategoryBodyContainer>
                </DirectoryItemContainer>
       
    )


}

export default DirectoryItem;