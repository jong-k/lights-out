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
          <label htmlFor="name">이름</label>
          <input
            name="name"
            id="name"
            value={form.name}
            onChange={handleChangeForm}
            type="text"
            required
          />
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            name="email"
            id="email"
            value={form.email}
            onChange={handleChangeForm}
            type="email"
            required
          />
        </div>
        <button type="submit">등록</button>
      </form>
    </main>
  );
};

export default UserForm;
