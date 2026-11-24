import { useEffect, useMemo, useState } from 'react'

const USERS_KEY = 'tru_users_v2'
const POSTS_KEY = 'tru_posts_v2'
const SESSION_KEY = 'tru_session'

const starterUsers = [
  { id: 'admin', name: 'Tru Admin', email: 'admin@tru.com', password: 'Admin@123', role: 'admin', bio: 'Platform Administrator' },
  { id: 'u1', name: 'Meena', email: 'meena@tru.com', password: 'Meena@123', role: 'user', bio: 'B.Tech student | Tech lover' },
  { id: 'u2', name: 'Ananya', email: 'ananya@tru.com', password: 'Ananya@123', role: 'user', bio: 'Music and books' },
  { id: 'u3', name: 'Rahul', email: 'rahul@tru.com', password: 'Rahul@123', role: 'user', bio: 'Technology enthusiast' }
]
const starterPosts = [
  { id: 'p1', author: 'Meena', email: 'meena@tru.com', caption: 'Small moments, big memories ✨', image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=900', likes: [] },
  { id: 'p2', author: 'Ananya', email: 'ananya@tru.com', caption: 'A little color makes every day better 🌸', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=900', likes: [] }
]

function read(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}

export default function App() {
  const [users, setUsers] = useState(() => {
    const saved = read(USERS_KEY, [])
    const merged = [...saved]
    starterUsers.forEach(item => { if (!merged.some(user => user.email === item.email)) merged.push(item) })
    return merged
  })
  const [posts, setPosts] = useState(() => {
    const saved = read(POSTS_KEY, [])
    return saved.length ? saved : starterPosts
  })
  const [currentUser, setCurrentUser] = useState(() => {
    const email = sessionStorage.getItem(SESSION_KEY)
    return read(USERS_KEY, starterUsers).find(user => user.email === email) || starterUsers.find(user => user.email === email) || null
  })
  const [page, setPage] = useState('home')
  const [authMode, setAuthMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => { localStorage.setItem(USERS_KEY, JSON.stringify(users)) }, [users])
  useEffect(() => { localStorage.setItem(POSTS_KEY, JSON.stringify(posts)) }, [posts])
  useEffect(() => { if (notice) { const timer = setTimeout(() => setNotice(''), 2500); return () => clearTimeout(timer) } }, [notice])

  const isAdmin = currentUser?.role === 'admin'
  const regularUsers = useMemo(() => users.filter(user => user.role !== 'admin'), [users])

  function updateForm(event) { setForm({ ...form, [event.target.name]: event.target.value }) }
  function submitAuth(event) {
    event.preventDefault()
    const email = form.email.trim().toLowerCase()
    if (!email || !form.password) return setNotice('Enter email and password.')
    if (authMode === 'signup') {
      if (!form.name.trim()) return setNotice('Enter your name.')
      if (users.some(user => user.email.toLowerCase() === email)) return setNotice('This email is already registered.')
      const newUser = { id: `u${Date.now()}`, name: form.name.trim(), email, password: form.password, role: 'user', bio: 'New TRU member' }
      setUsers(previous => [...previous, newUser])
      signIn(newUser)
    } else {
      const found = users.find(user => user.email.toLowerCase() === email && user.password === form.password)
      if (!found) return setNotice('Invalid email or password.')
      signIn(found)
    }
  }
  function signIn(user) {
    setCurrentUser(user)
    sessionStorage.setItem(SESSION_KEY, user.email)
    setPage('home')
    setForm({ name: '', email: '', password: '' })
    setNotice(`Welcome to TRU, ${user.name}!`)
  }
  function logout() { setCurrentUser(null); sessionStorage.removeItem(SESSION_KEY); setPage('home'); setNotice('You have logged out.') }
  function createPost(event) {
    event.preventDefault()
    if (!caption.trim()) return setNotice('Write something before posting.')
    setPosts(previous => [{ id: `p${Date.now()}`, author: currentUser.name, email: currentUser.email, caption: caption.trim(), image: image.trim(), likes: [] }, ...previous])
    setCaption(''); setImage(''); setPage('home'); setNotice('Your post was shared!')
  }
  function toggleLike(postId) {
    setPosts(previous => previous.map(post => post.id === postId ? { ...post, likes: (post.likes || []).includes(currentUser.email) ? post.likes.filter(email => email !== currentUser.email) : [...(post.likes || []), currentUser.email] } : post))
  }
  function deletePost(postId) { setPosts(previous => previous.filter(post => post.id !== postId)); setNotice('Post deleted by admin.') }

  if (!currentUser) return <main className="auth-shell">
    <section className="auth-art"><div className="brand brand-light">tru<span>.</span></div><div><p className="eyebrow">YOUR SPACE. YOUR PEOPLE.</p><h1>Connect.<br/>Discover.<br/><em>Share.</em></h1><p className="art-copy">A place for real moments, new friends and everything you love.</p></div><div className="art-orb orb-one"/><div className="art-orb orb-two"/></section>
    <section className="auth-panel"><div className="auth-card"><p className="eyebrow purple">WELCOME TO TRU</p><h2>{authMode === 'login' ? 'Good to see you!' : 'Create your account'}</h2><p className="muted">{authMode === 'login' ? 'Sign in and catch up with your community.' : 'Join TRU and start sharing your moments.'}</p>
      <form onSubmit={submitAuth} className="auth-form">{authMode === 'signup' && <label>Full name<input name="name" value={form.name} onChange={updateForm} placeholder="Your name" /></label>}<label>Email address<input name="email" type="email" value={form.email} onChange={updateForm} placeholder="you@example.com" required /></label><label>Password<input name="password" type="password" value={form.password} onChange={updateForm} placeholder="Enter password" required /></label><button className="primary full">{authMode === 'login' ? 'Login' : 'Create account'}</button></form>
      <p className="switch-auth">{authMode === 'login' ? 'New to TRU?' : 'Already have an account?'} <button className="text-button" onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}>{authMode === 'login' ? 'Sign up' : 'Login'}</button></p>
      <div className="demo-box"><strong>Demo accounts</strong><span>Admin: admin@tru.com / Admin@123</span><span>User: meena@tru.com / Meena@123</span></div>
    </div></section>{notice && <div className="toast">{notice}</div>}</main>

  return <div className="app-shell"><header className="topbar"><button className="brand" onClick={() => setPage('home')}>tru<span>.</span></button><div className="top-right"><span className="user-chip">{currentUser.name}</span><span className={`role-chip ${isAdmin ? 'admin-chip' : ''}`}>{currentUser.role}</span><button className="logout" onClick={logout}>Log out</button></div></header>
    <div className="workspace"><aside className="sidebar"><p className="side-label">MENU</p><button className={page === 'home' ? 'nav-item active' : 'nav-item'} onClick={() => setPage('home')}>⌂ <span>Home feed</span></button>{!isAdmin && <button className={page === 'create' ? 'nav-item active' : 'nav-item'} onClick={() => setPage('create')}>＋ <span>Create post</span></button>}<button className={page === 'profile' ? 'nav-item active' : 'nav-item'} onClick={() => setPage('profile')}>◉ <span>My profile</span></button>{isAdmin && <><p className="side-label admin-label">MANAGEMENT</p><button className={page === 'admin' ? 'nav-item active' : 'nav-item'} onClick={() => setPage('admin')}>⚙ <span>Admin dashboard</span></button></>}<div className="sidebar-note"><div className="note-icon">✦</div><strong>Stay connected</strong><p>Share a moment and keep your community close.</p></div></aside>
    <main className="main-content">{page === 'home' && <><div className="page-heading"><div><p className="eyebrow purple">YOUR COMMUNITY</p><h1>Home feed</h1><p className="muted">See what your people are sharing today.</p></div>{!isAdmin && <button className="primary" onClick={() => setPage('create')}>＋ Create post</button>}</div>{posts.length === 0 ? <div className="empty-state">No posts yet. Be the first to share a moment!</div> : <div className="feed-grid">{posts.map(post => <article className="post-card" key={post.id}><div className="post-head"><div className="avatar">{post.author?.[0]?.toUpperCase() || 'T'}</div><div><strong>{post.author}</strong><small>{post.email}</small></div>{isAdmin && <button className="delete-button" onClick={() => deletePost(post.id)}>Delete</button>}</div><p className="post-caption">{post.caption}</p>{post.image && <img className="post-image" src={post.image} alt="Post" onError={event => { event.currentTarget.style.display = 'none' }} />}<div className="post-actions">{!isAdmin && <button className={(post.likes || []).includes(currentUser.email) ? 'liked' : ''} onClick={() => toggleLike(post.id)}>♡ Like</button>}<span>{(post.likes || []).length} likes</span></div></article>)}</div>}</>}
      {page === 'create' && !isAdmin && <section className="form-card"><p className="eyebrow purple">SHARE A MOMENT</p><h1>Create a post</h1><p className="muted">Tell your community what is happening.</p><form onSubmit={createPost} className="post-form"><label>Caption<textarea value={caption} onChange={event => setCaption(event.target.value)} placeholder="What's on your mind?" rows="5"/></label><label>Image URL <span className="optional">(optional)</span><input value={image} onChange={event => setImage(event.target.value)} placeholder="https://example.com/image.jpg"/></label><div className="form-actions"><button type="button" className="secondary" onClick={() => setPage('home')}>Cancel</button><button className="primary">Share post</button></div></form></section>}
      {page === 'profile' && <section className="profile-card"><div className="profile-cover"/><div className="profile-avatar">{currentUser.name[0].toUpperCase()}</div><h1>{currentUser.name}</h1><p className="muted">{currentUser.email}</p><span className="role-chip">{currentUser.role}</span><p className="profile-bio">{currentUser.bio || 'TRU community member'}</p><div className="profile-stats"><div><strong>{posts.filter(post => post.email === currentUser.email).length}</strong><span>Posts</span></div><div><strong>{users.length}</strong><span>Community members</span></div></div></section>}
      {page === 'admin' && isAdmin && <><div className="page-heading"><div><p className="eyebrow purple">CONTROL CENTER</p><h1>Admin dashboard</h1><p className="muted">Manage the TRU community from one place.</p></div><span className="role-chip admin-chip">Administrator</span></div><div className="stats-grid"><div className="stat-card"><span>Total users</span><strong>{regularUsers.length}</strong><small>Registered members</small></div><div className="stat-card"><span>Total posts</span><strong>{posts.length}</strong><small>Community posts</small></div><div className="stat-card"><span>Admin accounts</span><strong>{users.filter(user => user.role === 'admin').length}</strong><small>Platform managers</small></div></div><section className="table-card"><div className="table-title"><div><h2>Registered users</h2><p className="muted">User module account overview</p></div><span className="count-pill">{regularUsers.length} members</span></div><div className="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead><tbody>{users.map(user => <tr key={user.id}><td>{user.name}</td><td>{user.email}</td><td><span className={`role-chip ${user.role === 'admin' ? 'admin-chip' : ''}`}>{user.role}</span></td></tr>)}</tbody></table></div></section><section className="table-card recent-posts"><div className="table-title"><div><h2>Recent posts</h2><p className="muted">Remove inappropriate content if required.</p></div></div>{posts.length === 0 ? <p className="muted">No posts available.</p> : posts.map(post => <div className="admin-post-row" key={post.id}><div><strong>{post.author}</strong><p>{post.caption}</p></div><button className="delete-button" onClick={() => deletePost(post.id)}>Delete</button></div>)}</section></>}
    </main></div>{notice && <div className="toast">{notice}</div>}</div>
}
