import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import './SiparisSayfası.css';
import * as Yup from "yup";

    const SiparişSayfası = (props) => {

    const initialData= {
        boyutlar: false
    }

    const initialErrors= {
        boyutlar: ""
    }

    const formSchema = Yup.object().shape({
        boyutlar: Yup
        .boolean()
        .oneOf([true], "Birini seçmelisiniz.")
        .required("Birini seçmelisiniz.")
    })

    const [formData, setFormData] = useState(initialData);

    const[errors, setErrors] = useState(initialErrors);

    const [isChecked, setIsChecked] = useState(false);

    const [value, setValue] = useState('');

    const [count, setCount] = useState(1);

    const [total, setTotal] = useState(0);


    const fiyat = "85.50";

    const handleSubmit = (event) => {
        event.preventDefault();
        if(isChecked){
            setFormData(initialData)
        }else{
            setErrors(initialErrors)
        }
    }

    const handleCheck = (event) => {
        const list = [...isChecked, event.target.checked];
        setTotal(list.length*5);
    }

    const handleChange1 = (event) => {
        const {name, type, value, checked} = event.target;
        let result = (type === "checkbox") ? checked: value;
        setIsChecked(!isChecked);
        Yup.reach(formSchema)
            .validate(result)
            .then((success) => {
                setErrors({...errors, [name] : ""})
            })
            .catch(err => {
                setErrors({...errors, [name]: err.errors[0]})
            })
    }
    

    const handleChange2= event => {
        setValue(event.target.value);
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
                type="checkbox" 
                name="boyut"
                onChange={handleChange1}/>
                Küçük
                </div>

                <div className='boyut'>
                <input
                type="checkbox" 
                name="boyut"
                value= {formData.boyutlar}
                onChange={handleChange1}/>
                Orta
                </div>

                <div className='boyut'>
                <input
                type="checkbox" 
                name="boyut"
                onChange={handleChange1}/>
                Büyük
                </div>

            </label>

            <label>
                Hamur Seç *
                <select className='hamur' value= {value} onChange={handleChange2} name="hamur">
                    <option disabled={true} value="">
                        Hamur Kalınlığı
                    </option>
                    <option value="1">İnce</option>
                    <option value="2">Normal</option>
                    <option value="3">Kalın</option>
                </select>
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
                    value= {item}
                    onChange={handleChange1}
                     />
                    <span>{item}</span>
                 </div>
            ))}
            </div>
                
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
                value = {value}
                onChange= {handleChange2}
                />
                </div>
            </label>

            <hr />
            
            <div className='bottomPage'>

            <div className='artıEksi'>
                <button onClick= {handleClick1}>-</button>
                <span> {count} </span>
                <button onClick= {handleClick2}>+</button>
            </div>

            <div className='toplam'>
                <label>
                    Sipariş Toplamı
                    <p>Seçimler {total + "₺"}</p>
                    <p>Toplam {Number(fiyat) + Number(total) + "₺"}</p>
                    <button onClick= {() => onayPage()}>SİPARİŞ VER</button>
                </label>
            </div>

            </div>

            </form>

        </div>
    )
}

export default SiparişSayfası;