import React from 'react';
import styles from './big_card.module.css';

const BigCard = () => {
    return (
        <div className={styles.categorycard}>
            <div className={styles.categorytitle}>类别2</div>
            <div className={styles.divider}></div>
            {/* 第一个项目：新增价格区域 */}
            <div className={styles.item}>
                <div className={styles.itemimg}></div>
                <div className={styles.iteminfo}>
                    <div className={styles.itemname}>名称</div>
                    <div className={styles.itemprice}>¥19.90</div>
                </div>
                <button className={styles.downloadbtn}>下载</button>
            </div>
            <div className={styles.divider}></div>
            {/* 第二个项目：新增价格区域 */}
            <div className={styles.item}>
                <div className={styles.itemimg}></div>
                <div className={styles.iteminfo}>
                    <div className={styles.itemname}>名称</div>
                    <div className={styles.itemprice}>¥29.90</div>
                </div>
                <button className={styles.downloadbtn}>下载</button>
            </div>
        </div>
    );
};

export default BigCard;