import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./SiparisSayfası.css";
import * as Yup from "yup";

const initialData = {
  boyut: false,
  kalınlık: "",
  malzemeler: [],
  not: "",
  adet: "",
};

const initialErrors = {
  boyut: "",
  kalınlık: "",
  malzemeler: "",
  not: "",
  adet: "",
};

const formSchema = Yup.object().shape({
  boyut: Yup.string().required("Boyut seçmelisiniz."),
  kalınlık: Yup.string().required("Hamur kalınlığı seçmelisiniz."),
  malzemeler: Yup.array().max(10, "En fazla 10 malzeme seçebilirsiniz."),
  not: Yup.string(),
  adet: Yup.boolean(),
});

const fiyat = 85.5;

const ekMalzemeler = [
  "Pepperoni",
  "Sosis",
  "Tavuk Izgara",
  "Soğan",
  "Domates",
  "Mısır",
  "Sucuk",
  "Jalepeno",
  "Sarımsak",
  "Biber",
  "Ananas",
  "Kabak",
];

const SiparişSayfası = ({ submitFn }) => {
  const [formData, setFormData] = useState(initialData);

  const [errors, setErrors] = useState(initialErrors);

  const [count, setCount] = useState(1);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => setButtonDisabled(!valid));
  }, [formData]);

  const formControl = (name, value) => {
    Yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        setErrors({
          ...errors,
          [name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [name]: err.errors[0],
        });
      });
  };

  const handleChecboxChange = (e) => {
    const { value } = e.target;

    let yeniMalzemeler = [...formData.malzemeler];
    const index = formData.malzemeler.indexOf(value);

    if (index > -1) {
      yeniMalzemeler.splice(index, 1);
    } else {
      yeniMalzemeler.push(value);
    }

    formControl("malzemeler", yeniMalzemeler);
    setFormData({
      ...formData,
      malzemeler: yeniMalzemeler,
    });

    const totalPrice = yeniMalzemeler.reduce((sum) => {
      return sum + 5;
    }, 0);

    setTotal(totalPrice);
  };

  const handleOthersChange = (e) => {
    const { name, value } = e.target;
    formControl(name, value);
    setFormData({ ...formData, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    submitFn({
      ...formData,
    });
    setFormData(initialData);
  }

  const handleClick1 = (event) => {
    event.preventDefault();
    if (count > 1) {
      setCount(count - 1);
      setFormData({ ...formData, adet: count - 1 });
    }
  };

  const handleClick2 = (event) => {
    event.preventDefault();
    setCount(count + 1);
    setFormData({ ...formData, adet: count + 1 });
  };

  const history = useHistory();

  function onayPage() {
    history.push("/onay");
  }

  return (
    <div className="arkaplan">
      <div className="baslık">
        <h2>Teknolojik Yemekler</h2>
        <h5>AnaSayfa- Seçenekler- Sipariş Oluştur</h5>
      </div>
      <p className="pizzaIsmi">Position Absolute Acı Pizza</p>

      <div className="fiyatBaslık">
        <span className="span1">{fiyat + "₺"}</span>
        <span className="span2">4.9</span>
        <span className="span2">(200)</span>
      </div>

      <p className="acıklama">
        Frontend Dev olarak hala position: absolute kullanıyorsan bu çok acı
        pizza tam sana göre. Pizza domates, peynir ve genellikle çeşitli diğer
        malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir
        fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş
        mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir
        yemektir... Küçük bir pizzaya bazen pizzetta denir.{" "}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="boyutHamur">
          <label>
            Boyut Seç <span className="span">*</span>
            <label className="boyut">
              {" "}
              Küçük
              <input
                type="radio"
                name="boyut"
                value="küçük"
                checked={formData.boyut === "küçük"}
                onChange={handleOthersChange}
              />
            </label>
            <label className="boyut">
              {" "}
              Orta
              <input
                type="radio"
                name="boyut"
                value="orta"
                checked={formData.boyut === "orta"}
                onChange={handleOthersChange}
              />
            </label>
            <label className="boyut">
              {" "}
              Büyük
              <input
                type="radio"
                name="boyut"
                value="büyük"
                checked={formData.boyut === "büyük"}
                onChange={handleOthersChange}
              />
            </label>
            <p>{errors.boyut}</p>
          </label>

          <label>
            Hamur Seç <span className="span">*</span>
            <select
              className="hamur"
              value={formData.kalınlık}
              onChange={handleOthersChange}
              name="kalınlık"
            >
              <option disabled={true} value="">
                Hamur Kalınlığı
              </option>
              <option value="1">İnce</option>
              <option value="2">Normal</option>
              <option value="3">Kalın</option>
            </select>
            <p>{errors.kalınlık}</p>
          </label>
        </div>

        <div>
          <label className="label">
            Ek malzemeler
            <p className="acıklama">En fazla 10 malzeme seçebilirsiniz. 5₺</p>
            <div className="malzemeler">
              {ekMalzemeler.map((item) => (
                <div className="malzemeler-items" key={item}>
                  <input
                    type="checkbox"
                    name="malzemeler"
                    value={item}
                    checked={formData.malzemeler.includes(item)}
                    onChange={handleChecboxChange}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p>{errors.malzemeler}</p>
          </label>
        </div>

        <label className="label">
          Sipariş Notu
          <div>
            <input
              className="input"
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              type="text"
              name="not"
              value={formData.not}
              onChange={handleOthersChange}
            />
          </div>
        </label>

        <hr />

        <div className="bottomPage">
          <div className="artıEksi">
            <button onClick={handleClick1}>-</button>
            <span value={formData.adet}> {count} </span>
            <button onClick={handleClick2}>+</button>
          </div>

          <div className="toplam">
            <label>
              Sipariş Toplamı
              <p className="final">
                <span>Seçimler</span> <span>{total * count} ₺</span>
              </p>
              <p className="final">
                <span>Toplam</span>{" "}
                <span>{fiyat * count + total * count} ₺</span>
              </p>
              <button disabled={!buttonDisabled} onClick={() => onayPage()}>
                SİPARİŞ VER
              </button>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SiparişSayfası;
