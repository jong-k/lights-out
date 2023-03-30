import { useState } from "react";

const UserForm = ({ addUsers }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const handleChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  };

  const handleSubmit = (e) => {
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
        <div>
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
        </div>
        <div>
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
        </div>
        <button type="submit">등록</button>
      </form>
    </main>
  );
};

export default UserForm;
