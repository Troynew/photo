import React from 'react';
import { Row, Col } from 'antd';

const Contract = ({ orderNo, userData = {} }) => {
  return (
    <div id="contract" style={{ display: 'none' }}>
      <Row>
        <Col span={10}>
          <div style={{ fontSize: '32px', color: '#333333', fontWeight: 'bold' }}>
            I BABY{' '}
            <p
              style={{ fontSize: '20px', display: 'inline', color: '#333333', fontWeight: 'bold' }}
            >
              创意儿童摄影
            </p>
          </div>{' '}
        </Col>
        <Col span={8}>
          <div style={{ fontSize: '32px', color: '#333333', fontWeight: 'bold' }}>预订单</div>
        </Col>
        <Col span={6}>
          <div style={{ fontSize: '20px', marginTop: '10px' }}>NO.{orderNo}</div>
        </Col>
      </Row>

      <Row>
        <Col span={8}>预约时间</Col>
      </Row>

      <Row style={{ border: '1px solid #000000' }} align="middle" justify="center">
        <Col
          span={2}
          style={{
            borderRight: '1px solid #000000',
            height: '53px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          宝贝姓名
        </Col>
        <Col
          span={4}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '53px',
          }}
        >
          {userData.babyName}
        </Col>
        <Col
          span={2}
          style={{
            borderRight: '1px solid #000000',
            borderLeft: '1px solid #000000',
            height: '53px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          宝贝性别
        </Col>
        <Col
          span={4}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '53px',
          }}
        >
          {userData.sex}
        </Col>
        <Col
          span={3}
          style={{
            borderRight: '1px solid #000000',
            borderLeft: '1px solid #000000',
            height: '53px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          宝贝生日
        </Col>
        <Col span={9} style={{ height: '53px' }}>
          <Row style={{ borderBottom: '1px solid #000000', height: '26px' }}>
            <Col
              span={24}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              农历：{userData.lunarBirthdayDate}
            </Col>
          </Row>
          <Row style={{ height: '27px' }}>
            <Col
              span={24}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              新历：{userData.solarBirthdayDate}
            </Col>
          </Row>
        </Col>
      </Row>

      <Row
        style={{ border: '1px solid #000000', borderTop: 'none' }}
        align="middle"
        justify="center"
      >
        <Col
          span={2}
          style={{
            borderRight: '1px solid #000000',
            height: '30px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          家长姓名
        </Col>
        <Col
          span={10}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '30px',
          }}
        >
          {userData.babyName}
        </Col>
        <Col
          span={3}
          style={{
            borderRight: '1px solid #000000',
            borderLeft: '1px solid #000000',
            height: '30px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          家长电话
        </Col>
        <Col
          span={9}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '30px',
          }}
        >
          {userData.sex}
        </Col>
      </Row>

      <Row
        style={{ border: '1px solid #000000', borderTop: 'none' }}
        align="middle"
        justify="center"
      >
        <Col
          span={2}
          style={{
            borderRight: '1px solid #000000',
            height: '30px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          家庭地址
        </Col>
        <Col
          span={22}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '30px',
          }}
        >
          {userData.babyName}
        </Col>
      </Row>

      <Row
        style={{ border: '1px solid #000000', borderTop: 'none' }}
        align="middle"
        justify="center"
      >
        <Col
          span={2}
          style={{
            borderRight: '1px solid #000000',
            height: '30px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          套餐名称
        </Col>
        <Col
          span={4}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '30px',
            borderRight: '1px solid #000000',
          }}
        >
          {userData.babyName}
        </Col>
        <Col
          span={2}
          style={{
            borderRight: '1px solid #000000',
            height: '30px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          套餐价格
        </Col>
        <Col
          span={4}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '30px',
            borderRight: '1px solid #000000',
          }}
        >
          {userData.babyName}
        </Col>
        <Col
          span={3}
          style={{
            borderRight: '1px solid #000000',
            height: '30px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          收款人/日期
        </Col>
        <Col
          span={7}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '30px',
          }}
        >
          {userData.babyName}
        </Col>
      </Row>

      <Row
        style={{ border: '1px solid #000000', borderTop: 'none' }}
        align="middle"
        justify="center"
      >
        <Col
          span={2}
          style={{
            borderRight: '1px solid #000000',
            height: '30px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          入册张数
        </Col>
        <Col
          span={4}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '30px',
            borderRight: '1px solid #000000',
          }}
        >
          {userData.babyName}
        </Col>
        <Col
          span={2}
          style={{
            borderRight: '1px solid #000000',
            height: '30px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          底片张数
        </Col>
        <Col
          span={4}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '30px',
            borderRight: '1px solid #000000',
          }}
        >
          {userData.babyName}
        </Col>
        <Col
          span={3}
          style={{
            borderRight: '1px solid #000000',
            height: '30px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          付款方式
        </Col>
        <Col
          span={7}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '30px',
          }}
        >
          {userData.babyName}
        </Col>
      </Row>

      <Row
        style={{ border: '1px solid #000000', borderTop: 'none' }}
        align="middle"
        justify="center"
      >
        <Col
          span={2}
          style={{
            borderRight: '1px solid #000000',
            height: '30px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          拍摄日期
        </Col>
        <Col
          span={4}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '30px',
            borderRight: '1px solid #000000',
          }}
        >
          {userData.babyName}
        </Col>
        <Col
          span={2}
          style={{
            borderRight: '1px solid #000000',
            height: '30px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          订单门市
        </Col>
        <Col
          span={4}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '30px',
            borderRight: '1px solid #000000',
          }}
        >
          {userData.babyName}
        </Col>
        <Col
          span={3}
          style={{
            borderRight: '1px solid #000000',
            height: '30px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          客户来源
        </Col>
        <Col
          span={7}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '30px',
          }}
        >
          {userData.babyName}
        </Col>
      </Row>

      <Row
        style={{ border: '1px solid #000000', borderTop: 'none' }}
        align="middle"
        justify="center"
      >
        <Col
          span={15}
          style={{
            borderRight: '1px solid #000000',
            height: '30px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          套系内容
        </Col>

        <Col
          span={9}
          style={{
            height: '30px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          其他产品
        </Col>
      </Row>

      <Row
        style={{ border: '1px solid #000000', borderTop: 'none' }}
        align="middle"
        justify="center"
      >
        <Col
          span={15}
          style={{
            borderRight: '1px solid #000000',
            height: '300px',
            padding: '10px',
          }}
        >
          <div>
            <p>第一次，入册______张__________相册，放大__________________________</p>
          </div>
          <div>
            <p>________________________________________________________________________</p>
          </div>
          <div>
            <p>第二次，入册______张__________相册，放大__________________________</p>
          </div>
          <div>
            <p>________________________________________________________________________</p>
          </div>
          <div>
            <p>第三次，入册______张__________相册，放大__________________________</p>
          </div>
          <div>
            <p>________________________________________________________________________</p>
          </div>
          <div>
            <p>其他__________________________________________________________________</p>
          </div>
          <div>
            <p>________________________________________________________________________</p>
          </div>
        </Col>

        <Col
          span={9}
          style={{
            height: '300px',
            padding: '10px',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          主管签字：_____________________________
        </Col>
      </Row>

      <Row
        style={{ border: '1px solid #000000', borderTop: 'none' }}
        align="middle"
        justify="center"
      >
        <Col
          span={24}
          style={{
            height: '280px',
            padding: '2px',
          }}
        >
          <div style={{ fontWeight: 'bold' }}>注意事项：</div>
          <div>拍摄取件流程：客户预约，拍摄，选片（约7天），设计制作（约10天），取件（约30天）</div>
          <div style={{ fontWeight: 'bold' }}>客户须知：</div>
          <div>1.本店人员对您的任何承诺均以文字形式写在单据上，口头承诺恕不履行。</div>
          <div>
            2.为保证拍摄质量给客户增加挑选机会，每组套系均会多拍，在拍摄过程中所多拍摄的镜头客户按喜好购买、未选底片恕不赠送，加选部分的数码照片和相应的数据底片按本店价格单收费，未挑选部分本店在店内选片时有权利删除数码数据底片且该数据底片权利属于本公司所有。
          </div>
          <div>3.宝宝拍摄成长册除约定张数外，加选底片每张收费30元，如需精修每张50元。</div>
          <div>4.本套系属于活动推广套系，低于成本价，订单后不予退单。</div>
          <div>
            5.此订单一但提交财务，不退不换。若顾客出现特殊情况，可协商处理（退款前提：所赠送的底片每张30元计算，产品等材料按照原价扣除）
          </div>
          <div>
            6.为保证拍照和选片质量，请不要太多随从进影棚（最多两名家长）拍摄区域请勿自带相机、手机等设备拍摄
          </div>
          <div>7.套系内所有放大以及摆台等产品，均从入册照片中选取</div>
        </Col>
      </Row>

      <Row style={{ marginTop: '10px' }}>
        <Col span={7}>
          <div style={{ fontSize: '24px' }}>门市：_____________</div>
        </Col>
        <Col span={10}>
          <div style={{ fontSize: '24px' }}>客户签字：______________</div>
        </Col>
        <Col span={7}>
          <div style={{ fontSize: '24px' }}>日期：_____________</div>
        </Col>
      </Row>
      {/* <div>
        晋江店：晋江市梅岭路海明文化产业城I Baby创意儿童摄影 预约电话：0595-85277888 / 13365968212{' '}
      </div> */}
      <div>南安店：南安市溪美双塘小区11栋1-4F I Baby创意儿童摄影 预约电话：15260738543</div>
    </div>
  );
};

export default Contract;
