import React from 'react';
import classnames from 'classnames';
import moment from 'moment';

import checkedImg from './checked.png';
import styles from './index.less';

const noop = () => {};

const Ticket = ({ data, disabled, selected, uid, onClick = noop }) => {
  return (
    <div
      className={classnames(styles.ticket, {
        [styles.disabled]: disabled,
      })}
      onClick={() => onClick(data[uid])}
    >
      <div className={styles.left}>
        <span>￥{data.denomination}</span>
        <span>代金券</span>
      </div>
      <div className={styles.right}>
        <div className={styles.title}>{data.couponName}</div>
        <div className={styles.content}>
          {data.useableRange === '商品' ? '商品' : '油品'}单笔满{data.amountCondition}元可用
        </div>
        <div className={styles.content}>可用范围：{data.useableRange}</div>
        <div className={styles.date}>
          {data.begins && <span>{moment(data.begins).format('YYYY-MM-DD')}</span>}
          {data.ends && <span>{moment(data.ends).format('YYYY-MM-DD')}</span>}
        </div>
      </div>
      {selected ? (
        <img className={styles.checked} src={checkedImg} alt="已选择" />
      ) : (
        <div className={styles.tag}>
          <div className={styles.word}>{disabled ? '不可用' : '可使用'}</div>
        </div>
      )}
    </div>
  );
};

const Cash = ({ data }) => {
  return (
    <div
      className={classnames(styles.ticket, styles.cash, {
        [styles.disabled]: data.status !== 'AVAILABLE',
      })}
    >
      <div className={styles.left}>
        <span>兑换券</span>
      </div>
      <div className={styles.right}>
        <div className={styles.title}>{data.name}</div>
        <div className={styles.content}>{data.giftName}</div>
        <div className={styles.date} style={{ position: 'absolute', bottom: 13 }}>
          {(data.startTime &&
            data.endTime &&
            `${data.startTime && moment(data.startTime).format('YYYY-MM-DD')}~${data.endTime &&
              moment(data.endTime).format('YYYY-MM-DD')}`) ||
            data.effectTime}
        </div>
      </div>
      <div className={styles.tag}>
        <div className={styles.word}>{data.status === 'AVAILABLE' ? '未使用' : '已使用'}</div>
      </div>
    </div>
  );
};

Ticket.Cash = Cash;

export default Ticket;
