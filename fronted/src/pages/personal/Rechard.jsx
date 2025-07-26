import React, { useState } from "react";
import { Card, InputNumber, Button, Modal } from "antd";
import { Settings } from "lucide-react";
import styles from "./Rechard.module.css"; // Adjust the import path

const RechargeCard = () => {
  const [isRechargeVisible, setIsRechargeVisible] = useState(false);
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);

  const handleRecharge = () => {
    setIsRechargeVisible(true);
  };

  const handleCancel = () => {
    setIsRechargeVisible(false);
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Here you would call your recharge API
      // await rechargeApi(amount);
      console.log("Recharging amount:", amount);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Modal.success({
        title: "充值成功",
        content: `成功充值 ${amount} 元`,
      });
      setIsRechargeVisible(false);
    } catch (error) {
      Modal.error({
        title: "充值失败",
        content: error.message || "请稍后重试",
      });
    } finally {
      setLoading(false);
    }
  };

  const presetAmounts = [50, 100, 200, 500, 1000];

  return (
    <div className={styles.rechargeContainer}>
      <button className={styles.actionBtn} onClick={handleRecharge}>
        <Settings size={16} />
        充值
      </button>

      <Modal
        title="账户充值"
        visible={isRechargeVisible}
        onCancel={handleCancel}
        footer={null}
        width={400}
        centered
      >
        <Card bordered={false} className={styles.rechargeCard}>
          <div className={styles.amountSection}>
            <h4>充值金额</h4>
            <InputNumber
              min={10}
              max={10000}
              defaultValue={100}
              onChange={handleAmountChange}
              formatter={(value) => `¥ ${value}`}
              parser={(value) => value.replace(/¥\s?|(,*)/g, "")}
              style={{ width: "100%", margin: "10px 0" }}
            />

            <div className={styles.presetAmounts}>
              {presetAmounts.map((amt) => (
                <Button
                  key={amt}
                  type={amount === amt ? "primary" : "default"}
                  onClick={() => setAmount(amt)}
                >
                  ¥{amt}
                </Button>
              ))}
            </div>
          </div>

          <div className={styles.paymentSection}>
            <h4>支付方式</h4>
            <div className={styles.paymentMethods}>
              <Button
                className={styles.paymentMethod}
                icon={<AlipayOutlined />}
              >
                支付宝
              </Button>
              <Button
                className={styles.paymentMethod}
                icon={<WechatOutlined />}
              >
                微信支付
              </Button>
            </div>
          </div>

          <Button
            type="primary"
            block
            size="large"
            onClick={handleSubmit}
            loading={loading}
            style={{ marginTop: 20 }}
          >
            立即充值 ¥{amount}
          </Button>
        </Card>
      </Modal>
    </div>
  );
};

export default RechargeCard;
