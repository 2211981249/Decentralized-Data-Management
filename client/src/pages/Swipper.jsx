import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import swipperImage from "/src/assets/Swipper-Image.jpg"
import swipperImage2 from "/src/assets/sliderImage-3.webp"
import swipperImage3 from "/src/assets/sliderImage-2.webp";

const spanStyle = {
  padding: '20px',
  background: '#efefef',
  color: '#000000'
}

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '400px'
}
const slideImages = [
  {
    url: `${swipperImage}`,
    
  },
  {
    url: `${swipperImage2}`
   
  },
  {
    url: `${swipperImage3}`
    
  },
];

const Slideshow = () => {
    return (
      <div className="slide-container" style={{marginTop:"6rem"}}>
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    )
}

export  default Slideshow;