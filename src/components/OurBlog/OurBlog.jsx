import styles from './OurBlog.module.css';

const blogPosts = [
  {
    id: 1,
	updatedAt: 'July, 2024',
    title: 'How to Prepare Your Home for a New Pet',
    description: "Bringing a new pet home? Ensure a smooth transition by pet-proofing your home, setting up a comfortable space, and stocking up on essential supplies. Additionally, introduce your new pet to their environment gradually, allowing them time to explore and adjust at their own pace",
  },
  {
    id: 2,
	updatedAt: 'July, 2024',
    title: 'Simple DIY Pet Toys',
    description: '',
  },
  {
    id: 3,
	updatedAt: 'July, 2024',
    title: 'The Importance of Regular Vet Visits',
    description: '',
  },
  
];

function OurBlog() {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Our Blog</h2>
      <div className={styles.blogPosts}>
        {blogPosts.map((post) => (
          <div key={post.id} className={styles.blogPost}>
            <h3 className={styles.title}>{post.title}</h3>
			<p className={styles.description}>{post.updatedAt}</p>
            <p className={styles.description}>{post.description}</p>
            <a href="#" className={styles.readMore}>Read more..</a>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <a href="/blog" className={styles.viewAll}>See more..</a>
        <form className={styles.subscriptionForm}>
          <label htmlFor="email" className={styles.label}>Subscribe to the news</label>
          <input type="email" id="email" name="email" className={styles.emailInput} placeholder="Your email" required />
          <button type="submit" className={styles.subscribeButton}>Subscribe</button>
        </form>
      </div>
    </div>
  );
}

export default OurBlog;