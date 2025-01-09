import styles from "./index.module.css";
import DropperLayout from "../../../../layouts/dropper";

export default function DropperUserRoleRegistrationPage() {
    return (
        <DropperLayout>
            <div className={styles.container}>
                <form action="" method="" className={styles.form}>
                    <label htmlFor="dropperUserRoleRegistrationPageInputRole">
                        Role:
                        <br />
                        <input
                            type="text"
                            name="dropperUserRoleRegistrationPageInputRole"
                            id="dropperUserRoleRegistrationPageInputRole"
                        />
                    </label>
                    <div className={styles.permissionsBlock}>
                        Permissions
                        <div className={styles.permissionsGroupHeader}>
                            <input type="checkbox" name="" id="" value="" />
                            <label htmlFor=""> Products</label>
                            <div className={styles.permissionsGroupBody}>
                                <label htmlFor="">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        value=""
                                    />{" "}
                                    Register Products
                                </label>
                                <br />
                                <label htmlFor="">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        value=""
                                    />{" "}
                                    View Products
                                </label>
                                <br />
                                <label htmlFor="">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        value=""
                                    />{" "}
                                    Edit Products
                                </label>
                                <br />
                                <label htmlFor="">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        value=""
                                    />{" "}
                                    Delete Products
                                </label>
                                <br />
                            </div>
                        </div>
                        <div className={styles.permissionsGroupHeader}>
                            <input type="checkbox" name="" id="" value="" />
                            <label htmlFor=""> Offers</label>
                            <div className={styles.permissionsGroupBody}>
                                <label htmlFor="">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        value=""
                                    />{" "}
                                    Register Product Offers
                                </label>
                                <br />
                                <label htmlFor="">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        value=""
                                    />{" "}
                                    View Product Offers
                                </label>
                                <br />
                                <label htmlFor="">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        value=""
                                    />{" "}
                                    Edit Product Offers
                                </label>
                                <br />
                                <label htmlFor="">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        value=""
                                    />{" "}
                                    Delete Product Offers
                                </label>
                                <br />
                            </div>
                        </div>
                        <div className={styles.permissionsGroupHeader}>
                            <input type="checkbox" name="" id="" value="" />
                            <label htmlFor=""> Users</label>
                            <div className={styles.permissionsGroupBody}>
                                <label htmlFor="">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        value=""
                                    />{" "}
                                    Register Users
                                </label>
                                <br />
                                <label htmlFor="">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        value=""
                                    />{" "}
                                    View Users
                                </label>
                                <br />
                                <label htmlFor="">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        value=""
                                    />{" "}
                                    Edit Users
                                </label>
                                <br />
                                <label htmlFor="">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        value=""
                                    />{" "}
                                    Delete Users
                                </label>
                                <br />
                            </div>
                        </div>
                        <div className={styles.permissionsGroupHeader}>
                            <input type="checkbox" name="" id="" value="" />
                            <label htmlFor=""> Roles</label>
                            <div className={styles.permissionsGroupBody}>
                                <label htmlFor="">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        value=""
                                    />{" "}
                                    Register Roles
                                </label>
                                <br />
                                <label htmlFor="">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        value=""
                                    />{" "}
                                    View Roles
                                </label>
                                <br />
                                <label htmlFor="">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        value=""
                                    />{" "}
                                    Edit Roles
                                </label>
                                <br />
                                <label htmlFor="">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        value=""
                                    />{" "}
                                    Delete Roles
                                </label>
                                <br />
                            </div>
                        </div>
                        <div className={styles.permissionsGroupHeader}>
                            <input type="checkbox" name="" id="" value="" />
                            <label htmlFor=""> Drops</label>
                            <div className={styles.permissionsGroupBody}>
                                <label htmlFor="">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        value=""
                                    />{" "}
                                    Register Drops
                                </label>
                                <br />
                                <label htmlFor="">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        value=""
                                    />{" "}
                                    View Drops
                                </label>
                                <br />
                                <label htmlFor="">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        value=""
                                    />{" "}
                                    Edit Drops
                                </label>
                                <br />
                                <label htmlFor="">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        value=""
                                    />{" "}
                                    Delete Drops
                                </label>
                                <br />
                            </div>
                        </div>
                        <div className={styles.permissionsGroupHeader}>
                            <input type="checkbox" name="" id="" value="" />
                            <label htmlFor=""> Fetcher Console</label>
                        </div>
                        <div className={styles.permissionsGroupHeader}>
                            <input type="checkbox" name="" id="" value="" />
                            <label htmlFor=""> Developer Console</label>
                        </div>
                    </div>
                    <button>Register</button>
                </form>
            </div>
        </DropperLayout>
    );
}
