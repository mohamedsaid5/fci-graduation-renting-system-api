import heart from '../../assets/icons/icons8-heart-24.png';
import phone from '../../assets/icons/phone.png';
import mail from '../../assets/icons/mail.png';
import whats from '../../assets/icons/whats.png';
import deleteIcon from '../../assets/icons/deleteIcon.png';
import useAuth from "../../hooks/useAuth";

import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import emptyImage from '../../assets/images/no-internet_up2.png'
import { ImageLoader } from '../Loader';

export default function ApartmentCard({ item, onFav, onRmoveFav, isFav, onDelete, owner = false }) {
    const navigate = useNavigate();
    const { updateAuth, user, removeFav, setUser } = useAuth();
    const {
        added_date,
        address,
        bathrooms,
        beds,
        description,
        finishing_type,
        floor_number,
        owner: apartmentOwner,
        id,
        owner_email,
        owner_phone_number,
        owner_username,
        photos: photosList,
        price,
        status,
        rooms,
        size,
        title,
        view,
        year_of_construction
    } = item ?? {};

    let photos = (photosList && photosList?.length > 0) ? photosList : [{ photo: emptyImage, id: 1 }];

    return (
        <>

            <div className="card mb-3 col-lg-9 col-sm-12 card-full">
                <div className="row g-0">
                    <div className="col-md-4" style={{ cursor: 'pointer', padding: '0' }} onClick={() => id && navigate(`/showapartment/${id}`)}>
                        <Carousel>
                            {
                                photos.map(({ photo, id }) => (
                                    <Carousel.Item key={id}>
                                        {/* <img
                                            className="d-block w-100 apart_img"
                                            src={photo}
                                        /> */}
                                        <ImageLoader
                                            alt={`${description}`}
                                            src={photo}
                                            className="card mb-1 apartment-photos-card"
                                            // parentStyle={{ width: '17rem' }}
                                            key={id}
                                            style={{ objectFit: 'cover' }}
                                        />

                                    </Carousel.Item>
                                ))
                            }

                        </Carousel>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <p className="card-text">
                                <small className="text-secondary">Apartment</small>
                            </p>
                            <h5 className="card-title">{price} EGP</h5>
                            {user.user_type === "owner" && (
                            <h5 className="card-title">{status}</h5>
                            )}

                            <p className="card-text"><b>{title}</b></p>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-secondary">{address}</small></p>
                            <small className="text-body-secondary">{added_date}</small>

                            <div className="card-footer">

                                {
                                    !owner ? (
                                        <>
                                            <a target="_blank" className="btn btn-outline-success" href={`tel:${owner_phone_number}`}>
                                                <img src={phone} alt="phone icon" style={{ height: '20px' }} />
                                                <span>Call</span>
                                            </a>

                                            <a target="_blank" href={`mailto:${owner_email}?subject=I Wanaa Ask You&body=Hello, I have Ask for you.`} className="btn btn-outline-success">
                                                <img src={mail} alt="mail icon" style={{ height: '20px' }} />
                                                <span>Email</span>
                                            </a>

                                            <a target="_blank" className="btn btn-outline-success" href={`https://api.whatsapp.com/send?phone=${owner_phone_number}&text=Your%20message%20goes%20here`}>
                                                <img src={whats} alt="whats icon" style={{ height: '20px' }} />
                                                <span>WhatsApp</span>
                                            </a>

                                            {
                                                (item.is_fav != true && item.is_fav != 1 && !isFav) ? (
                                                    <button className="btn btn-outline-success m-1" onClick={onFav}>
                                                        <img src={heart} alt="heart icon" style={{ height: '20px' }} />
                                                    </button>
                                                ) :
                                                    (
                                                        <button className="btn btn-outline-success m-1" onClick={onRmoveFav}>
                                                            <img src={deleteIcon} alt="heart icon" style={{ height: '20px' }} />
                                                        </button>
                                                    )
                                            }
                                        </>

                                    )
                                        :
                                        (
                                            <>
                                                <a target="_blank" className="btn btn-outline-success" href={`/add/${id}`}>
                                                    {/* <img src={phone} alt="phone icon" style={{ height: '20px' }} /> */}
                                                    <span>Edit</span>
                                                </a>
                                                <button className="btn btn-outline-success m-1" onClick={onDelete}>
                                                    <img src={deleteIcon} alt="heart icon" style={{ height: '20px' }} />
                                                </button>
                                            </>
                                        )

                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
