"use client";
import { Badge, Card, Col, Divider, Flex, Row } from 'antd';
import { useState } from 'react'
import Navbar from '../components/Navbar';

export default function page() {
  const [count, setCount] = useState(0)
  const [shapes, setShapes] = useState([
    'square',
    'circle',
    'oval',
    'trapezoid',
    'rectangle',
    'parallelogram'
  ])
  function handleToggle() {
    count ? setCount(count - 1) : setCount(count + 1)
    const shapeDel = shapes.splice(0, 3)
    setShapes([...shapes, ...shapeDel])
  }
  function handleLeft() {
    const shift = shapes.shift() as string
    setShapes([...shapes, shift])
  }
  function handleRight() {
    const pop = shapes.pop() as string
    setShapes([pop, ...shapes])
  }
  // function handleRandomShape () {
  //   const item = shapes[Math.floor(Math.random() * shapes.length)];
  //   console.log(item);

  // }
  function handleRandomShape() {
    //   set the index to the arrays length
    let i = shapes.length, j, temp
    //   create a loop that subtracts everytime it iterates through
    while (--i > 0) {
      //  create a random number and store it in a variable
      j = Math.floor(Math.random() * (i + 1))
      // create a temporary position from the item of the random number    
      temp = shapes[j]
      // swap the temp with the position of the last item in the array    
      shapes[j] = shapes[i]
      // swap the last item with the position of the random number 
      shapes[i] = temp
    }
    // return[execute] the array when it completes::don't really need the console.log but helps to check
    setShapes([...shapes])
  }

  return (
    <div>
      <h2>Layout & Style</h2>
      <Navbar />
      <div className='content'>
        {/* <Flex gap="middle" align="center" vertical>
          <div>sdsdsd</div>
        </Flex> */}
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card hoverable bordered={false} className='hover' onClick={handleLeft}>
              <div id='triangle-left' className='center'></div>
              <Badge
                className="absolute"
                count={78}
                style={{ backgroundColor: '#6EDA78', boxShadow: '0 0 0px'}}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card hoverable bordered={false} className='hover'>
              <Flex onClick={handleToggle}>
                <div id='triangle-up' className='center'></div>
                <div id='triangle-down' className='center'></div>
              </Flex>
              <Badge
                className="absolute"
                count={78}
                style={{ backgroundColor: '#6EDA78', boxShadow: '0 0 0px'}}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card hoverable bordered={false} className='hover' onClick={handleRight}>
              <div id='triangle-right' className='center'></div>
              <Badge
                className="absolute"
                count={78}
                style={{ backgroundColor: '#6EDA78', boxShadow: '0 0 0px'}}
              />
            </Card>
          </Col>
        </Row>
        <Divider />
        <Flex gap="middle" vertical>
          {
            Array.from(Array(2).keys()).map((row, index) => (
              <Row key={index} gutter={[16, 16]} justify={(index + count) % 2 === 0 ? 'end' : 'center'}>
                {
                  shapes.filter((_, f_index) => index === 0 ? f_index <= 2 : f_index > 2).map((shape, index) => (
                    <Col key={index} span={6}>
                      <Card hoverable className='hover'>
                        <div id={shape} className='center' onClick={handleRandomShape}></div>
                      </Card>
                    </Col>
                  ))
                }
              </Row>
            ))
          }
        </Flex>
      </div>
    </div >
  )
}
