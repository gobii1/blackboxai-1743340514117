const { BrowserRouter, Routes, Route, Navigate } = ReactRouterDOM;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminDashboard" element={<ProtectedRoute allowedRoles={['Admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/vendorDashboard" element={<ProtectedRoute allowedRoles={['Vendor']}><VendorDashboard /></ProtectedRoute>} />
        <Route path="/customerDashboard" element={<ProtectedRoute allowedRoles={['Customer']}><CustomerDashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

function ProtectedRoute({ children, allowedRoles }) {
  const role = localStorage.getItem('userRole');
  return allowedRoles.includes(role) ? children : <Navigate to="/login" />;
}

// Temporary components - will be moved to separate files
function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <section className="h-screen bg-cover bg-center" style={{backgroundImage: "url('https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg')"}}>
        <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-5xl font-extrabold mb-6">Welcome to E-Commerce Portal</h1>
          <p className="text-2xl mb-8">Choose Your Role to Get Started</p>
          <Link to="/login" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Login</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Header() {
  const role = localStorage.getItem('userRole');
  const logout = () => {
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">E-Commerce Portal</Link>
        <div className="flex space-x-6">
          {role === 'Admin' && <Link to="/adminDashboard" className="hover:text-blue-500 transition">Admin Panel</Link>}
          {role === 'Vendor' && <Link to="/vendorDashboard" className="hover:text-blue-500 transition">Vendor Panel</Link>}
          {role === 'Customer' && <Link to="/customerDashboard" className="hover:text-blue-500 transition">Shop</Link>}
          {role && <button onClick={logout} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Logout</button>}
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600">© 2024 E-Commerce Portal. All rights reserved.</p>
      </div>
    </footer>
  );
}

// Temporary login component
function Login() {
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
    role: 'Customer'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userRole', formData.role);
    window.location.href = `/${formData.role.toLowerCase()}Dashboard`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Username</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block mb-1">Password</label>
              <input 
                type="password" 
                className="w-full p-2 border rounded"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block mb-1">Role</label>
              <select 
                className="w-full p-2 border rounded"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="Admin">Admin</option>
                <option value="Vendor">Vendor</option>
                <option value="Customer">Customer</option>
              </select>
            </div>
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Temporary dashboard components
function AdminDashboard() {
  const users = [
    { id: 1, name: 'Admin User', role: 'Admin' },
    { id: 2, name: 'Vendor 1', role: 'Vendor' },
    { id: 3, name: 'Customer 1', role: 'Customer' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <table className="w-full border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b">
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function VendorDashboard() {
  const products = [
    { id: 1, name: 'Product 1', price: 19.99, stock: 10 },
    { id: 2, name: 'Product 2', price: 29.99, stock: 5 }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Product Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map(product => (
              <div key={product.id} className="border p-4 rounded-lg">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
                <p className="text-gray-600">Stock: {product.stock}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function CustomerDashboard() {
  const products = [
    { id: 1, name: 'Product A', price: 9.99, image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg' },
    { id: 2, name: 'Product B', price: 14.99, image: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-gray-600 mb-2">${product.price}</p>
              <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));