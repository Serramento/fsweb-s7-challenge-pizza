import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './SiparisSayfası.css';
import * as Yup from "yup";
import axios from 'axios';

const initialData= {
    boyut: false,
    kalınlık: "",
    malzemeler: "",
    not: "",
    adet: ""
}

const initialErrors= {
    boyut: "",
    kalınlık: "",
    malzemeler: "",
    not: "",
    adet: ""
}

const formSchema = Yup.object().shape({
    boyut: Yup
    .boolean()
    .oneOf([true], "Birini seçmelisiniz.")
    .required("Birini seçmelisiniz."),
    kalınlık: Yup
    .boolean()
    .required("Birini seçmelisiniz."),
    malzemeler: Yup
    .boolean("En fazla 10 malzeme seçebilirsiniz.")
})

const url = "https://reqres.in/api/users";

const fiyat = "85.50";

    const SiparişSayfası = (props) => {

    const [formData, setFormData] = useState(initialData);

    const[errors, setErrors] = useState(initialErrors);

    const [isValid, setIsValid] = useState(false);

    const [count, setCount] = useState(1);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(isValid) {
            axios.post(url, formData)
            .then((response) => {
                console.log(response);
                setFormData(initialData);
            })
            .catch((error) => {
                console.error(error);
            })
            }
        }

    useEffect(() => {
        formSchema.isValid(formData)
        .then((valid) => {
            setIsValid(valid)
        })
    }, [formData]);
    

    const handleChange1 = (event) => {
        const {name, type, value, checked} = event.target;
        let valuex = (type === "checkbox" || "radio") ? checked: value;
        setFormData({...formData, [name]: value})
        Yup.reach(formSchema, name)
            .validate(valuex)
            .then((success) => {
                setErrors({...errors, [name] : ""})
            })
            .catch(err => {
                setErrors({...errors, [name]: err.errors[0]})
            })
    }
    
    const handleClick1 = event => {
        event.preventDefault();
        if(count>1){
            setCount(count - 1);
        } 
    }

    const handleClick2 = event => {
        event.preventDefault();
        setCount(count + 1);
    }

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
        "Kabak"
    ];

    function toplama() {
        const result= (fiyat + formData.malzemeler.length *5) * formData.adet;
        return result;
    }

    const history= useHistory();

    function onayPage() {
        history.push("/onay");
      }

    return(
        <div className='arkaplan'>
            <div className= 'baslık'>
                <h2>Teknolojik Yemekler</h2>
                <h5>AnaSayfa- Seçenekler- Sipariş Oluştur</h5>
            </div>
            <p className='pizzaIsmi'>Position Absolute Acı Pizza</p>

            <div className= 'fiyatBaslık'>
                <span className= 'span1'>{fiyat + "₺"}</span> 
                <span className= 'span2'>4.9</span>
                <span className= 'span2'>(200)</span>
            </div>
            
            <p className='acıklama'>Frontend Dev olarak hala position: absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir... Küçük bir pizzaya bazen pizzetta denir. </p>

            <form onSubmit={handleSubmit} >

            <div className= 'boyutHamur'>
            <label>
                Boyut Seç *

                <div className='boyut'>
                <input
                type="radio" 
                name="boyut"
                value= {formData.boyut}
                onChange={handleChange1}/>
                Küçük
                </div>

                <div className='boyut'>
                <input
                type="radio" 
                name="boyut"
                value= {formData.boyut}
                onChange={handleChange1}/>
                Orta
                </div>

                <div className='boyut'>
                <input
                type="radio" 
                name="boyut"
                value= {formData.boyut}
                onChange={handleChange1}/>
                Büyük
                </div>

                <p>{errors.boyut}</p>

            </label>

            <label>
                Hamur Seç *
                <select className='hamur' value= {formData.kalınlık} onChange={handleChange1} name="kalınlık">
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
            <label className='label'>
                Ek malzemeler
                <p className='acıklama'>En fazla 10 malzeme seçebilirsiniz. 5₺</p>

            <div className= 'malzemeler'>
            {ekMalzemeler.map((item, index) =>(
                <div key= {index}>
                    <input 
                    type= "checkbox"
                    value= {formData.malzemeler}
                    onChange={handleChange1}
                     />
                    <span>{item}</span>
                 </div>
            ))}
            </div>

            <p>{errors.malzemeler}</p>
                
            </label>
            </div>

            
            <label className='label'>
                Sipariş Notu
                <div>
                <input 
                className= 'input'
                placeholder='Siparişine eklemek istediğin bir not var mı?'
                type= "text"
                name= "not"
                value = {formData.not}
                onChange= {handleChange1}
                />
                </div>
            </label>

            <hr />
            
            <div className='bottomPage'>

            <div className='artıEksi'>
                <button onClick= {handleClick1}>-</button>
                <span value= {formData.adet} > {count} </span>
                <button onClick= {handleClick2}>+</button>
            </div>

            <div className='toplam'>
                <label>
                    Sipariş Toplamı
                    <p>Seçimler {formData.malzemeler.length*5}  ₺</p>
                    <p>Toplam {toplama} ₺</p>
                    <button disabled = {!isValid} onClick= {() => onayPage()}>SİPARİŞ VER</button>
                </label>
            </div>

            </div>

            </form>

        </div>
    )
}

export default SiparişSayfası;