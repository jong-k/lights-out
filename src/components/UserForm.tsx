import React, { ChangeEvent, FormEvent } from "react";
import { UserType } from "../interfaces";
import { useState } from "react";

interface PropType {
  addUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
}
const UserForm = ({ addUsers }: PropType) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUsers((prevState) => [...prevState, form]);
    setForm({
      name: "",
      email: "",
    });
  };

  return (
    <main>
      <h2>유저 생성</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          이름
          <input
            name="name"
            value={form.name}
            onChange={handleChangeForm}
            type="text"
            required
          />
        </label>
        <label htmlFor="">
          이메일
          <input
            name="email"
            value={form.email}
            onChange={handleChangeForm}
            type="email"
            required
          />
        </label>
        <button type="submit">등록</button>
      </form>
    </main>
  );
};

export default UserForm;
