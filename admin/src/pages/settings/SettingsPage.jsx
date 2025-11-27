import { useEffect, useState } from 'react'
import { Card, Form, Input, Tabs, Button, Space, message, InputNumber, Switch, Alert, Modal, Divider, Select, Slider, Statistic, Row, Col } from 'antd'
import { BellOutlined, RobotOutlined, LinkOutlined } from '@ant-design/icons'
import api from '../../api'

function SettingsPage() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [sendingWarnings, setSendingWarnings] = useState(false)
  const [previewExpiry, setPreviewExpiry] = useState(null)

  // محاسبه پیش‌نمایش زمان انقضا
  const calculateExpiryPreview = (hours) => {
    if (!hours) return null
    const now = new Date()
    const expiryDate = new Date(now.getTime() + hours * 60 * 60 * 1000)
    return expiryDate
  }

  // فرمت زمان به فارسی
  const formatExpiryTime = (date) => {
    if (!date) return ''
    const hours = Math.floor((date - new Date()) / (60 * 60 * 1000))
    const minutes = Math.floor(((date - new Date()) % (60 * 60 * 1000)) / (60 * 1000))

    if (hours >= 24) {
      const days = Math.floor(hours / 24)
      const remainingHours = hours % 24
      return `${days} روز${remainingHours > 0 ? ` و ${remainingHours} ساعت` : ''}`
    } else if (hours > 0) {
      return `${hours} ساعت${minutes > 0 ? ` و ${minutes} دقیقه` : ''}`
    } else {
      return `${minutes} دقیقه`
    }
  }

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const res = await api.get('/settings')
      const data = res?.data?.data || {}

      form.setFieldsValue({
        storeName: data.storeName || '',
        storeEmail: data.storeEmail || '',
        storePhone: data.storePhone || '',
        storeAddress: data.storeAddress || '',
        notificationSettings: {
          ...(data.notificationSettings || {}),
          emailFrom:
            (data.notificationSettings && data.notificationSettings.emailFrom) ||
            'noreply@example.com',
        },
        cartSettings: {
          cartTTLHours: data.cartSettings?.cartTTLHours || 1,
          autoExpireEnabled: data.cartSettings?.autoExpireEnabled !== false,
          autoDeleteExpired: data.cartSettings?.autoDeleteExpired || false,
          permanentCart: data.cartSettings?.permanentCart || false,
          expiryWarningEnabled: data.cartSettings?.expiryWarningEnabled || false,
          expiryWarningMinutes: data.cartSettings?.expiryWarningMinutes || 30,
        },
        kycSettings: {
          provider: data.kycSettings?.provider || 'mock',
          isActive: data.kycSettings?.isActive !== false,
          apiKey: data.kycSettings?.apiKey || '', // Usually empty/masked from server
          clientId: data.kycSettings?.clientId || '',
        },
        aiConfig: {
          enabled: data.aiConfig?.enabled || false,
          apiKey: data.aiConfig?.apiKey || '',
          customSystemPrompt: data.aiConfig?.customSystemPrompt || '',
        },

      })
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'خطا در دریافت تنظیمات فروشگاه'
      message.error(msg)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSendExpiryWarnings = async () => {
    Modal.confirm({
      title: 'ارسال هشدارهای انقضا',
      content:
        'آیا می‌خواهید هشدار انقضا را برای تمام سبدهای خریدی که نزدیک به انقضا هستند ارسال کنید؟',
      okText: 'ارسال',
      cancelText: 'لغو',
      onOk: async () => {
        try {
          setSendingWarnings(true)
          const res = await api.post('/carts/admin/send-warnings')
          const count = res?.data?.count || 0
          message.success(`هشدار انقضا برای ${count} سبد خرید ارسال شد`)
        } catch (err) {
          const errorMsg = err?.response?.data?.message || 'خطا در ارسال هشدارها'
          message.error(errorMsg)
        } finally {
          setSendingWarnings(false)
        }
      },
    })
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()

      const payload = {
        storeName: values.storeName || '',
        storeEmail: values.storeEmail || '',
        storePhone: values.storePhone || '',
        storeAddress: values.storeAddress || '',
      }

      if (values.notificationSettings) {
        const ns = {}

        if (
          Object.prototype.hasOwnProperty.call(
            values.notificationSettings,
            'emailFrom',
          )
        ) {
          ns.emailFrom = values.notificationSettings.emailFrom
        }

        if (
          values.notificationSettings.smsApiKey !== undefined &&
          values.notificationSettings.smsApiKey !== null &&
          values.notificationSettings.smsApiKey !== ''
        ) {
          ns.smsApiKey = values.notificationSettings.smsApiKey
        }

        if (Object.keys(ns).length > 0) {
          payload.notificationSettings = ns
        }
      }

      if (values.paymentGatewayKeys) {
        const pgk = {}

        if (
          values.paymentGatewayKeys.apiKey !== undefined &&
          values.paymentGatewayKeys.apiKey !== null &&
          values.paymentGatewayKeys.apiKey !== ''
        ) {
          pgk.apiKey = values.paymentGatewayKeys.apiKey
        }

        if (
          values.paymentGatewayKeys.apiSecret !== undefined &&
          values.paymentGatewayKeys.apiSecret !== null &&
          values.paymentGatewayKeys.apiSecret !== ''
        ) {
          pgk.apiSecret = values.paymentGatewayKeys.apiSecret
        }

        if (Object.keys(pgk).length > 0) {
          payload.paymentGatewayKeys = pgk
        }
      }

      if (values.cartSettings) {
        const cs = {}

        if (values.cartSettings.cartTTLHours !== undefined) {
          cs.cartTTLHours = values.cartSettings.cartTTLHours
        }

        if (values.cartSettings.autoExpireEnabled !== undefined) {
          cs.autoExpireEnabled = values.cartSettings.autoExpireEnabled
        }

        if (values.cartSettings.autoDeleteExpired !== undefined) {
          cs.autoDeleteExpired = values.cartSettings.autoDeleteExpired
        }

        if (values.cartSettings.permanentCart !== undefined) {
          cs.permanentCart = values.cartSettings.permanentCart
        }

        if (values.cartSettings.expiryWarningEnabled !== undefined) {
          cs.expiryWarningEnabled = values.cartSettings.expiryWarningEnabled
        }

        if (values.cartSettings.expiryWarningMinutes !== undefined) {
          cs.expiryWarningMinutes = values.cartSettings.expiryWarningMinutes
        }

        if (Object.keys(cs).length > 0) {
          payload.cartSettings = cs
        }
      }

      if (values.kycSettings) {
        const kyc = { ...values.kycSettings }
        // Clean up empty strings for secrets to avoid overwriting with empty
        if (!kyc.apiKey) delete kyc.apiKey
        if (!kyc.clientId) delete kyc.clientId

        payload.kycSettings = kyc
      }

      if (values.aiConfig) {
        const ai = { ...values.aiConfig }
        if (!ai.apiKey) delete ai.apiKey
        payload.aiConfig = ai
      }



      setSaving(true)
      await api.put('/settings', payload)
      message.success('تنظیمات با موفقیت ذخیره شد')
      fetchSettings()
    } catch (err) {
      if (err?.errorFields) {
        return
      }

      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'خطا در ذخیره تنظیمات فروشگاه'
      message.error(msg)
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    {
      key: 'general',
      label: 'تنظیمات عمومی',
      children: (
        <>
          <Form.Item
            name="storeName"
            label="نام فروشگاه"
            rules={[
              {
                required: true,
                message: 'لطفاً نام فروشگاه را وارد کنید',
              },
            ]}
          >
            <Input placeholder="مثلاً: فروشگاه من" />
          </Form.Item>

          <Form.Item
            name="storeEmail"
            label="ایمیل فروشگاه"
            rules={[
              {
                type: 'email',
                message: 'ایمیل وارد شده معتبر نیست',
              },
            ]}
          >
            <Input placeholder="info@example.com" />
          </Form.Item>

          <Form.Item name="storePhone" label="شماره تماس فروشگاه">
            <Input placeholder="مثلاً: 0912..." />
          </Form.Item>

          <Form.Item name="storeAddress" label="آدرس فروشگاه">
            <Input.TextArea rows={3} />
          </Form.Item>
        </>
      ),
    },
    {
      key: 'payment',
      label: 'تنظیمات درگاه پرداخت',
      children: (
        <>
          <Form.Item
            name={['paymentGatewayKeys', 'apiKey']}
            label="API Key درگاه پرداخت"
          >
            <Input.Password placeholder="********" />
          </Form.Item>

          <Form.Item
            name={['paymentGatewayKeys', 'apiSecret']}
            label="API Secret درگاه پرداخت"
          >
            <Input.Password placeholder="********" />
          </Form.Item>
        </>
      ),
    },
    {
      key: 'notifications',
      label: 'تنظیمات اعلان‌ها',
      children: (
        <>
          <Form.Item
            name={['notificationSettings', 'smsApiKey']}
            label="SMS API Key"
          >
            <Input placeholder="مثلاً: کلید API سرویس SMS" />
          </Form.Item>

          <Form.Item
            name={['notificationSettings', 'emailFrom']}
            label="ایمیل فرستنده اعلان‌ها"
          >
            <Input placeholder="noreply@example.com" />
          </Form.Item>
        </>
      ),
    },
    {
      key: 'cart',
      label: 'تنظیمات سبد خرید',
      children: (
        <>
          <Alert
            message="تنظیمات مهلت سبد خرید"
            description="این تنظیمات تعیین می‌کند کاربران چقدر زمان دارند تا خریدشان را تکمیل کنند. پس از این مدت، سبدشان خالی می‌شود."
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />

          {/* پیش‌نمایش زنده */}
          <Form.Item
            noStyle
            shouldUpdate={(prev, curr) =>
              prev.cartSettings?.cartTTLHours !== curr.cartSettings?.cartTTLHours ||
              prev.cartSettings?.permanentCart !== curr.cartSettings?.permanentCart ||
              prev.cartSettings?.expiryWarningMinutes !== curr.cartSettings?.expiryWarningMinutes ||
              prev.cartSettings?.expiryWarningEnabled !== curr.cartSettings?.expiryWarningEnabled
            }
          >
            {({ getFieldValue }) => {
              const isPermanent = getFieldValue(['cartSettings', 'permanentCart'])
              const ttlHours = getFieldValue(['cartSettings', 'cartTTLHours']) || 1
              const warningMinutes = getFieldValue(['cartSettings', 'expiryWarningMinutes']) || 30
              const warningEnabled = getFieldValue(['cartSettings', 'expiryWarningEnabled'])

              if (isPermanent) {
                return (
                  <Alert
                    message="📌 حالت فعلی: سبد ماندگار"
                    description={
                      <div>
                        <strong>سناریو:</strong> کاربر الان محصولی به سبد اضافه می‌کند → سبد برای همیشه باقی می‌ماند (حتی تا 1 سال بعد!)
                        <br />
                        <strong>مناسب برای:</strong> سایت‌های B2B یا لیست خواسته‌های بلندمدت
                      </div>
                    }
                    type="success"
                    style={{ marginBottom: 24, backgroundColor: '#f6ffed' }}
                  />
                )
              }

              const expiryDate = calculateExpiryPreview(ttlHours)
              const expiryTimeText = formatExpiryTime(expiryDate)
              const warningDate = new Date(expiryDate.getTime() - warningMinutes * 60 * 1000)
              const warningTimeText = formatExpiryTime(warningDate)

              const now = new Date()
              const expiryTime = now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
              const expiryFullTime = expiryDate.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
              const warningFullTime = warningDate.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })

              return (
                <Alert
                  message={`⏱️ پیش‌نمایش: چه اتفاقی می‌افتد؟`}
                  description={
                    <div style={{ lineHeight: '2' }}>
                      <div style={{ fontWeight: 'bold', marginBottom: 8 }}>🎬 سناریو:</div>
                      <div>🕐 <strong>همین الان ({expiryTime}):</strong> کاربر محصولی به سبد اضافه می‌کند</div>

                      {warningEnabled && (
                        <div style={{ color: '#fa8c16', marginTop: 4 }}>
                          🔔 <strong>{warningFullTime} ({warningTimeText} دیگر):</strong> هشدار انقضا به ایمیل/پیامک کاربر ارسال می‌شود
                        </div>
                      )}

                      <div style={{ color: '#cf1322', marginTop: 4 }}>
                        ⏰ <strong>{expiryFullTime} ({expiryTimeText} دیگر):</strong> سبد خرید منقضی می‌شود و آیتم‌ها پاک می‌شوند
                      </div>

                      <Divider style={{ margin: '12px 0' }} />

                      <div style={{ fontSize: '12px', color: '#666' }}>
                        <strong>💡 نکته:</strong> اگر کاربر در این مدت محصول جدیدی اضافه کند یا تعداد را تغییر دهد، تایمر از اول شروع می‌شود.
                      </div>
                    </div>
                  }
                  type="warning"
                  style={{ marginBottom: 24, backgroundColor: '#fffbe6' }}
                />
              )
            }}
          </Form.Item>

          <Form.Item
            name={['cartSettings', 'permanentCart']}
            label="🔒 سبدهای خرید ماندگار (بدون محدودیت زمانی)"
            valuePropName="checked"
            extra={
              <div>
                <div>✅ فعال: سبد هیچ‌وقت پاک نمی‌شود (مثل لیست خواسته‌ها)</div>
                <div>❌ غیرفعال: سبد بعد از مدت تعیین شده پاک می‌شود</div>
              </div>
            }
            tooltip="مناسب برای فروشگاه‌های B2B که مشتریان زمان زیادی برای تصمیم‌گیری نیاز دارند"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.cartSettings?.permanentCart !== currentValues.cartSettings?.permanentCart
            }
          >
            {({ getFieldValue }) => {
              const isPermanent = getFieldValue(['cartSettings', 'permanentCart'])

              return (
                <>
                  <Form.Item
                    name={['cartSettings', 'cartTTLHours']}
                    label="⏰ مهلت سبد خرید (چقدر زمان به کاربر بدهیم؟)"
                    rules={[
                      {
                        required: !isPermanent,
                        message: 'لطفاً مدت زمان را وارد کنید',
                      },
                    ]}
                    extra={
                      <div>
                        <div><strong>مثال‌های رایج:</strong></div>
                        <div>⚡ 0.5 ساعت (30 دقیقه): برای محصولات محدود و پرفروش</div>
                        <div>⭐ 1-2 ساعت: حالت استاندارد (توصیه می‌شود)</div>
                        <div>📦 3-6 ساعت: برای خریدهای سنگین‌تر</div>
                        <div>🏢 24-72 ساعت: برای فروشگاه‌های B2B</div>
                      </div>
                    }
                    tooltip="این مدت از آخرین تغییر سبد (اضافه/حذف محصول) محاسبه می‌شود"
                  >
                    <InputNumber
                      min={0.5}
                      max={168}
                      step={0.5}
                      precision={1}
                      style={{ width: '100%' }}
                      placeholder="1"
                      disabled={isPermanent}
                      onChange={(value) => setPreviewExpiry(calculateExpiryPreview(value))}
                    />
                  </Form.Item>

                  <Form.Item
                    name={['cartSettings', 'autoExpireEnabled']}
                    label="فعال‌سازی انقضای خودکار"
                    valuePropName="checked"
                    extra="اگر فعال باشد، سبدهای خرید پس از مدت تعیین شده به صورت خودکار منقضی می‌شوند"
                  >
                    <Switch disabled={isPermanent} />
                  </Form.Item>

                  <Form.Item
                    name={['cartSettings', 'autoDeleteExpired']}
                    label="حذف خودکار سبدهای منقضی شده"
                    valuePropName="checked"
                    extra="اگر فعال باشد، سبدهای منقضی شده به طور خودکار از دیتابیس حذف می‌شوند (توصیه نمی‌شود)"
                  >
                    <Switch disabled={isPermanent} />
                  </Form.Item>
                </>
              )
            }}
          </Form.Item>

          <Divider />

          <Alert
            message="هشدار انقضای سبد خرید"
            description="سیستم می‌تواند قبل از انقضای سبد، به کاربران هشدار بدهد تا آن‌ها فرصت تکمیل خرید داشته باشند."
            type="info"
            showIcon
            style={{ marginBottom: 24 }}
          />

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.cartSettings?.permanentCart !== currentValues.cartSettings?.permanentCart
            }
          >
            {({ getFieldValue }) => {
              const isPermanent = getFieldValue(['cartSettings', 'permanentCart'])

              return (
                <>
                  <Form.Item
                    name={['cartSettings', 'expiryWarningEnabled']}
                    label="فعال‌سازی هشدار قبل از انقضا"
                    valuePropName="checked"
                    extra="اگر فعال باشد، سیستم قبل از انقضای سبد به کاربران ایمیل و پیامک هشدار می‌دهد"
                  >
                    <Switch disabled={isPermanent} />
                  </Form.Item>

                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.cartSettings?.expiryWarningEnabled !== currentValues.cartSettings?.expiryWarningEnabled
                    }
                  >
                    {({ getFieldValue: getFieldValue2 }) => {
                      const isWarningEnabled = getFieldValue2(['cartSettings', 'expiryWarningEnabled'])

                      return (
                        <Form.Item
                          name={['cartSettings', 'expiryWarningMinutes']}
                          label="🔔 چه زمانی به کاربر هشدار بدهیم؟"
                          rules={[
                            {
                              required: isWarningEnabled && !isPermanent,
                              message: 'لطفاً زمان هشدار را وارد کنید',
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                const ttlHours = getFieldValue(['cartSettings', 'cartTTLHours']) || 1
                                const ttlMinutes = ttlHours * 60

                                if (!value) return Promise.resolve()

                                if (value >= ttlMinutes) {
                                  return Promise.reject(
                                    new Error(
                                      `زمان هشدار (${value} دقیقه) نمی‌تواند بیشتر از مهلت سبد (${ttlMinutes} دقیقه) باشد!`
                                    )
                                  )
                                }

                                if (value < 5) {
                                  return Promise.reject(new Error('حداقل 5 دقیقه قبل هشدار بدهید'))
                                }

                                return Promise.resolve()
                              },
                            }),
                          ]}
                          extra={
                            <div>
                              <div><strong>مثال:</strong> اگر سبد 1 ساعت (60 دقیقه) مهلت دارد:</div>
                              <div>• 15 دقیقه قبل: هشدار زودهنگام (45 دقیقه بعد از اضافه کردن)</div>
                              <div>• 30 دقیقه قبل: متعادل و توصیه شده ⭐</div>
                              <div>• 45 دقیقه قبل: هشدار دیرهنگام (فقط 15 دقیقه فرصت)</div>
                            </div>
                          }
                          tooltip="این هشدار به ایمیل و پیامک کاربر ارسال می‌شود تا فرصت تکمیل خرید داشته باشد"
                        >
                          <InputNumber
                            min={5}
                            max={120}
                            step={5}
                            style={{ width: '100%' }}
                            placeholder="30"
                            disabled={!isWarningEnabled || isPermanent}
                          />
                        </Form.Item>
                      )
                    }}
                  </Form.Item>

                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.cartSettings?.expiryWarningEnabled !== currentValues.cartSettings?.expiryWarningEnabled
                    }
                  >
                    {({ getFieldValue: getFieldValue3 }) => {
                      const isWarningEnabled = getFieldValue3(['cartSettings', 'expiryWarningEnabled'])

                      if (!isWarningEnabled || isPermanent) return null

                      return (
                        <div style={{ marginBottom: 24 }}>
                          <Button
                            type="default"
                            icon={<BellOutlined />}
                            onClick={handleSendExpiryWarnings}
                            loading={sendingWarnings}
                            block
                          >
                            ارسال دستی هشدارهای انقضا (همین الان)
                          </Button>
                          <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
                            با کلیک بر روی این دکمه، هشدار انقضا برای تمام سبدهای نزدیک به انقضا ارسال می‌شود
                          </div>
                        </div>
                      )
                    }}
                  </Form.Item>
                </>
              )
            }}
          </Form.Item>

          <Alert
            message="نکته مهم"
            description="توصیه می‌شود مدت زمان را بین 1 تا 3 ساعت تنظیم کنید. مدت بیش از حد کوتاه باعث نارضایتی کاربران و مدت بیش از حد طولانی باعث اشغال منابع سرور می‌شود."
            type="warning"
            showIcon
            style={{ marginTop: 24 }}
          />
        </>
      ),
    },



    {
      key: 'ai',
      label: (
        <span>
          <RobotOutlined /> دستیار هوشمند (welfvita)
        </span>
      ),
      children: (
        <>
          <Alert
            //message="تنظیمات دستیار فروش هوشمند"
            //description="این بخش برای اتصال به هوش مصنوعی Groq (Llama 3) جهت پاسخگویی به مشتریان استفاده می‌شود."
            type="info"
            showIcon
            icon={<RobotOutlined />}
            style={{ marginBottom: 24 }}
          />

          <Form.Item
            name={['aiConfig', 'enabled']}
            label="فعال‌سازی دستیار"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name={['aiConfig', 'apiKey']}
            label="Groq API Key"
          // extra={<a href="https://console.groq.com/keys" target="_blank" rel="noreferrer">دریافت‌کلید</a>}
          >
            <Input.Password placeholder="gsk_..." />
          </Form.Item>

          <Form.Item
            name={['aiConfig', 'customSystemPrompt']}
            label="دستورالعمل سیستم (System Prompt)"
            extra="شخصیت و رفتار هوش مصنوعی را اینجا تعریف کنید."
          >
            <Input.TextArea rows={10} placeholder="شما مشاور فروش..." />
          </Form.Item>
        </>
      )
    },
    {
      key: 'kyc',
      label: 'احراز هویت (ثبت احوال)',
      children: (
        <>
          <Alert
            message="تنظیمات احراز هویت (شاهکار)"
            description={
              <div>
                این بخش برای بررسی تطابق <strong>کد ملی</strong> و <strong>تاریخ تولد</strong> کاربران استفاده می‌شود.
                <br />
                برای استفاده از این قابلیت به صورت واقعی، باید از شرکت‌های واسط (مانند فینوتک) سرویس خریداری کنید.
                <br />
                <strong>نکته:</strong> حالت "تستی (Mock)" رایگان است و فقط صحت الگوریتم کد ملی را بررسی می‌کند.
              </div>
            }
            type="info"
            showIcon
            style={{ marginBottom: 24 }}
          />

          <Form.Item
            name={['kycSettings', 'isActive']}
            label="فعال‌سازی احراز هویت"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prev, curr) => prev.kycSettings?.isActive !== curr.kycSettings?.isActive}
          >
            {({ getFieldValue }) => {
              const isActive = getFieldValue(['kycSettings', 'isActive'])
              if (!isActive) return null

              return (
                <>
                  <Form.Item
                    name={['kycSettings', 'provider']}
                    label="انتخاب سرویس‌دهنده"
                    rules={[{ required: true, message: 'لطفاً سرویس‌دهنده را انتخاب کنید' }]}
                  >
                    <Select>
                      <Select.Option value="mock">تستی (Mock) - رایگان</Select.Option>
                      <Select.Option value="finnotech">فینوتک (Finnotech)</Select.Option>
                      <Select.Option value="jibit">جیبیت (Jibit) - به زودی</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    noStyle
                    shouldUpdate={(prev, curr) => prev.kycSettings?.provider !== curr.kycSettings?.provider}
                  >
                    {({ getFieldValue }) => {
                      const provider = getFieldValue(['kycSettings', 'provider'])

                      if (provider === 'mock') {
                        return (
                          <Alert
                            message="حالت تستی فعال است"
                            description="در این حالت، سیستم فقط ساختار ریاضی کد ملی را بررسی می‌کند و استعلام واقعی انجام نمی‌شود."
                            type="success"
                            showIcon
                            style={{ marginBottom: 24 }}
                          />
                        )
                      }

                      return (
                        <div style={{ border: '1px solid #f0f0f0', padding: 16, borderRadius: 8, marginBottom: 24 }}>
                          <div style={{ marginBottom: 16, fontWeight: 'bold', color: '#1890ff' }}>
                            تنظیمات اتصال به {provider === 'finnotech' ? 'فینوتک' : 'سرویس'}
                          </div>

                          <Form.Item
                            name={['kycSettings', 'apiKey']}
                            label="API Key (کلید دسترسی)"
                            rules={[{ required: true, message: 'وارد کردن کلید دسترسی الزامی است' }]}
                            extra="این کلید را از پنل کاربری سرویس‌دهنده دریافت کنید"
                          >
                            <Input.Password placeholder="********" />
                          </Form.Item>

                          {provider === 'finnotech' && (
                            <Form.Item
                              name={['kycSettings', 'clientId']}
                              label="Client ID (شناسه کلاینت)"
                              rules={[{ required: true, message: 'وارد کردن شناسه کلاینت الزامی است' }]}
                            >
                              <Input.Password placeholder="********" />
                            </Form.Item>
                          )}
                        </div>
                      )
                    }}
                  </Form.Item>
                </>
              )
            }}
          </Form.Item>
        </>
      ),
    },
  ]

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <h1>تنظیمات فروشگاه</h1>
        <Space>
          <Button onClick={fetchSettings} disabled={loading || saving}>
            بارگذاری مجدد تنظیمات
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={saving}
            disabled={loading}
          >
            ذخیره تغییرات
          </Button>
        </Space>
      </div>

      <Card loading={loading}>
        <Form form={form} layout="vertical">
          <Tabs defaultActiveKey="general" items={tabs} />
        </Form>
      </Card>
    </div>
  )
}

export default SettingsPage

