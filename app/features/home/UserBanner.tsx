import React from 'react';
import styles from './UserBanner.css';
export default function UserBanner(props: any) {
  return (
    <div className={styles.banner}>
      <div>
        <img
          className={styles.profilePicture}
          src={props.user.profile_image_url}
        />
      </div>
      <div>
          <h5>{props.user.display_name}</h5>
          <button className={styles.bannerButton} onClick={props.logout}>Logout</button>
      </div>
    </div>
  );
}
