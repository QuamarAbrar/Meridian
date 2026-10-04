import { useEffect, useRef } from "react"

const assets = "/assets"

const images = {
  onda: `${assets}/9248f.png`,
  seating: `${assets}/6c165.png`,
  tables: `${assets}/30e1e.png`,
  objects: `${assets}/9f441.png`,
  ondaProduct: `${assets}/b19a3.png`,
  arcProduct: `${assets}/d2268.png`,
  formaProduct: `${assets}/5e480.png`,
  livingRoom: `${assets}/7836a.png`,
  joinery: `${assets}/364aa.png`,
  material: `${assets}/e8b6b.png`,
  arc: `${assets}/3a9a1.png`,
  journalOne: `${assets}/54f02.png`,
  journalTwo: `${assets}/f1f84.png`,
  journalThree: `${assets}/b0f0c.png`,
}

const icons = {
  search: `${assets}/d3d0d.svg`,
  user: `${assets}/b4b86.svg`,
  bag: `${assets}/3175b.svg`,
  arrow: `${assets}/2765c.svg`,
  chevronLeft: `${assets}/4825a.svg`,
  chevronRight: `${assets}/d7b2e.svg`,
  chevronDown: `${assets}/ccb1e.svg`,
  arrowCream: `${assets}/c3222.svg`,
  arrowDark: `${assets}/62fc3.svg`,
  heart: `${assets}/5c848.svg`,
  swatchesOne: `${assets}/18d76.svg`,
  swatchesTwo: `${assets}/fc27d.svg`,
  swatchesThree: `${assets}/a29f6.svg`,
  arrowSmall: `${assets}/b7a75.svg`,
  circle: `${assets}/b6573.svg`,
  left: `${assets}/d87ec.svg`,
  right: `${assets}/560f7.svg`,
  truck: `${assets}/93830.svg`,
  return: `${assets}/0621d.svg`,
  chair: `${assets}/812e9.svg`,
  shield: `${assets}/16aca.svg`,
  arrowRight: `${assets}/8ef86.svg`,
}

type Product = {
  badge: string
  name: string
  price: string
  material: string
  image: string
  swatches: string
}

const products: Product[] = [
  {
    badge: "BESTSELLER",
    name: "Onda ottoman",
    price: "$94",
    material: "Bouclé / Solid oak",
    image: images.ondaProduct,
    swatches: icons.swatchesOne,
  },
  {
    badge: "NEW ARRIVAL",
    name: "Arc lounge chair",
    price: "$420",
    material: "Natural linen / Walnut",
    image: images.arcProduct,
    swatches: icons.swatchesTwo,
  },
  {
    badge: "\u200B",
    name: "Forma side table",
    price: "$180",
    material: "Solid oak / Natural finish",
    image: images.formaProduct,
    swatches: icons.swatchesThree,
  },
]

function ArrowLink({
  children,
  light = false,
}: {
  children: React.ReactNode
  light?: boolean
}) {
  return (
    <a className={`arrow-link ${light ? "light" : ""}`} href="#collection">
      <span>{children}</span>
      <img src={light ? icons.arrowCream : icons.arrow} alt="" />
    </a>
  )
}

function SectionTitle({
  eyebrow,
  children,
  action,
}: {
  eyebrow: string
  children: React.ReactNode
  action?: string
}) {
  return (
    <div className="section-heading reveal">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{children}</h2>
      </div>
      {action && <ArrowLink>{action}</ArrowLink>}
    </div>
  )
}

function App() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    const reveals = document.querySelectorAll<HTMLElement>(".reveal")
    if (reduced) {
      reveals.forEach((item) => item.classList.add("is-visible"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible")
        })
      },
      { threshold: 0.12 },
    )
    reveals.forEach((item) => observer.observe(item))

    let ticking = false
    const updateMotion = () => {
      const viewport = window.innerHeight
      document
        .querySelectorAll<HTMLElement>("[data-parallax]")
        .forEach((item) => {
          const rect = item.getBoundingClientRect()
          const progress = (viewport - rect.top) / (viewport + rect.height)
          const speed = Number(item.dataset.parallax || 40)
          item.style.setProperty("--shift", `${(progress - 0.5) * speed}px`)
        })
      if (heroRef.current) {
        const progress = Math.min(1, window.scrollY / Math.max(viewport, 1))
        heroRef.current.style.setProperty("--hero-scroll", String(progress))
      }
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateMotion)
        ticking = true
      }
    }
    updateMotion()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <main>
      <section className="hero" ref={heroRef}>
        <div className="announcement">
          Considered design, delivered with care. Complimentary delivery on
          orders over $500.
        </div>
        <header className="nav">
          <a className="brand" href="#">
            Meridian
          </a>
          <nav aria-label="Main navigation">
            <a href="#collection">Furniture</a>
            <a href="#categories">Collections</a>
            <a href="#story">Our story</a>
            <a href="#journal">Journal</a>
          </nav>
          <div className="nav-actions">
            <button aria-label="Search">
              <img src={icons.search} alt="" />
            </button>
            <button aria-label="Account">
              <img src={icons.user} alt="" />
            </button>
            <button aria-label="Shopping bag">
              <img src={icons.bag} alt="" />
              <span>0</span>
            </button>
          </div>
        </header>

        <div className="hero-stage">
          <div className="hero-copy">
            <p className="hero-word reveal">MERIDIAN</p>
            <div className="hero-subcopy reveal">
              <h1>Slow furniture for modern living</h1>
              <p>
                Sculptural comfort for everyday moments. Designed to soften a
                room and stay for years.
              </p>
              <ArrowLink light>Explore the collection</ArrowLink>
            </div>
          </div>
          <div className="hero-product" data-parallax="105">
            <img
              src={images.onda}
              alt="Onda ottoman in charcoal bouclé and oak"
            />
          </div>
          <div
            className="hero-index"
            aria-label="Featured piece 01, priced at $94"
          >
            <span>
              <small>Piece</small>
              <strong>01</strong>
            </span>
            <span>
              <small>Price</small>
              <strong>$94</strong>
            </span>
          </div>
          <div className="hero-stock">The Onda · In stock</div>
        </div>
        <a href="#categories" className="scroll-cue">
          Explore the collection ↓
        </a>
        <div className="press-row">
          <span>Featured in</span>
          <b>Kinfolk</b>
          <b>Dezeen</b>
          <b>ELLE DECOR</b>
          <b>design milk</b>
          <b>Wallpaper*</b>
        </div>
      </section>

      <section className="dark-section categories" id="categories">
        <SectionTitle
          eyebrow="01 / Find your everyday"
          action="Explore all furniture"
        >
          Good design. Every room.
        </SectionTitle>
        <div className="category-grid">
          {[
            ["Seating", "A softer place to land", images.seating],
            ["Tables", "Gather around good design", images.tables],
            ["Objects", "The finishing touches", images.objects],
          ].map(([name, description, image], index) => (
            <a
              className="category-card reveal"
              href="#collection"
              key={name}
              style={{ "--delay": `${index * 110}ms` } as React.CSSProperties}
            >
              <div className="image-window">
                <img src={image} alt="" data-parallax="60" />
              </div>
              <div>
                <h3>{name}</h3>
                <p>{description}</p>
              </div>
              <img
                className="card-arrow"
                src={index === 2 ? icons.arrowDark : icons.arrowCream}
                alt=""
              />
            </a>
          ))}
        </div>
      </section>

      <section className="light-section favorites" id="collection">
        <SectionTitle
          eyebrow="02 / Well loved, for good reason"
          action="Shop the collection"
        >
          Meet your new favorites.
        </SectionTitle>
        <div className="filters" role="tablist" aria-label="Product categories">
          <button className="active">All pieces</button>
          <button>Seating</button>
          <button>Tables</button>
          <button>Objects</button>
        </div>
        <div className="product-grid">
          {products.map((product, index) => (
            <article
              className="product-card reveal"
              key={product.name}
              style={{ "--delay": `${index * 120}ms` } as React.CSSProperties}
            >
              <div className="product-image">
                <span>{product.badge}</span>
                <button aria-label={`Save ${product.name}`}>
                  <img src={icons.heart} alt="" />
                </button>
                <img
                  className="furniture"
                  src={product.image}
                  alt={product.name}
                  data-parallax={String(45 + index * 10)}
                />
              </div>
              <div className="product-title">
                <h3>{product.name}</h3>
                <span>{product.price}</span>
              </div>
              <div className="product-meta">
                <span>{product.material}</span>
                <img src={product.swatches} alt="Available finishes" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="room-section">
        <SectionTitle eyebrow="03 / A room, a feeling">
          Space to just be.
        </SectionTitle>
        <p className="room-intro reveal">
          Soft textures, warm wood, and nothing more than you need. Make room
          for the everyday.
        </p>
        <div className="room-image reveal">
          <img
            src={images.livingRoom}
            alt="Warm and minimal living room"
            data-parallax="80"
          />
          <div className="product-pin pin-one">
            <b>+</b>
            <span>
              Onda ottoman
              <br />
              <small>Charcoal / $94</small>
            </span>
          </div>
          <div className="product-pin pin-two">
            <b>+</b>
            <span>
              Arc lounge chair
              <br />
              <small>Natural linen / $420</small>
            </span>
          </div>
          <div className="room-caption">
            <span>THE QUIET LIVING ROOM</span>
            <ArrowLink light>Shop this room</ArrowLink>
          </div>
        </div>
        <div className="room-footer">
          <p>
            A considered edit of six pieces. Designed to live beautifully
            together.
          </p>
          <span>Living room edit / 06 pieces</span>
        </div>
      </section>

      <section className="craft-section" id="story">
        <div className="craft-collage reveal">
          <div className="craft-main image-window">
            <img
              src={images.joinery}
              alt="Craftsperson making furniture"
              data-parallax="90"
            />
          </div>
          <div className="craft-detail image-window">
            <img
              src={images.material}
              alt="Natural upholstery texture"
              data-parallax="55"
            />
          </div>
          <strong>FROM OUR HANDS, TO YOUR HOME.</strong>
        </div>
        <div className="craft-copy reveal">
          <p className="eyebrow">04 / Honest by nature</p>
          <h2>
            Made slowly.
            <br />
            Loved for years.
          </h2>
          <p>
            We believe the best furniture feels as good as it looks. So we work
            with small, independent workshops, choose materials with care, and
            leave the beauty of natural grain on show.
          </p>
          <dl>
            <div>
              <dt>Solid wood</dt>
              <dd>Responsibly sourced</dd>
            </div>
            <div>
              <dt>Natural texture</dt>
              <dd>Made to be touched</dd>
            </div>
            <div>
              <dt>Lasting design</dt>
              <dd>Not passing trends</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="arc-section">
        <div className="arc-copy reveal">
          <p className="eyebrow">05 / Form meets feeling</p>
          <h2>
            A curve worth
            <br />
            coming home to.
          </h2>
          <p>
            Meet Arc. An embracing silhouette, a beautifully open frame, and
            comfort that invites you to stay a little longer. Your new favorite
            corner starts here.
          </p>
          <div className="arc-specs">
            <span>
              <small>WALNUT &amp; LINEN</small>Arc lounge chair
            </span>
            <span>
              <small>FROM</small>$420
            </span>
          </div>
          <ArrowLink>Find your Arc</ArrowLink>
        </div>
        <div className="arc-sculpture reveal">
          <span className="arc-word">ARC</span>
          <img className="arc-circle" src={icons.circle} alt="" />
          <img
            className="arc-chair"
            src={images.arc}
            alt="Arc lounge chair"
            data-parallax="100"
          />
          <p>
            Soft by design.
            <br />
            Strong by nature.
          </p>
        </div>
      </section>

      <section className="testimonial">
        <div className="rating reveal">
          <p className="eyebrow">06 / Real homes, real comfort</p>
          <strong>4.9 / 5</strong>
          <span>★★★★★</span>
          <small>From 1,200+ happy homes</small>
        </div>
        <div className="quote reveal">
          <blockquote>
            “The kind of furniture that makes a room feel finished. Beautiful to
            look at, even better to live with.”
          </blockquote>
          <div>
            <p>
              Clara M. — Brooklyn, NY
              <small>Verified owner of the Arc lounge chair</small>
            </p>
            <span>
              <button>
                <img src={icons.left} alt="Previous review" />
              </button>
              <button>
                <img src={icons.right} alt="Next review" />
              </button>
            </span>
          </div>
        </div>
      </section>

      <section className="journal light-section" id="journal">
        <SectionTitle
          eyebrow="07 / Notes on a slower life"
          action="Visit the journal"
        >
          A little inspiration to live with.
        </SectionTitle>
        <div className="journal-grid">
          {[
            [
              images.journalOne,
              "LIVING WELL / 5 MIN READ",
              "The beauty of a quieter room",
            ],
            [
              images.journalTwo,
              "MATERIAL NOTES / 4 MIN READ",
              "A little guide to natural materials",
            ],
            [
              images.journalThree,
              "AT HOME / 6 MIN READ",
              "Around the table, together",
            ],
          ].map(([image, label, title], index) => (
            <article
              className="journal-card reveal"
              key={title}
              style={{ "--delay": `${index * 100}ms` } as React.CSSProperties}
            >
              <div className="image-window">
                <img src={image} alt="" data-parallax="60" />
              </div>
              <small>{label}</small>
              <h3>{title}</h3>
              <ArrowLink>Read the story</ArrowLink>
            </article>
          ))}
        </div>
      </section>

      <section className="benefits">
        {[
          [
            icons.truck,
            "Delivered with care",
            "Free delivery on orders over $500.",
          ],
          [
            icons.return,
            "Feel at home, or return it",
            "30 days to find your perfect fit.",
          ],
          [
            icons.chair,
            "Here to help you choose",
            "Complimentary styling advice.",
          ],
          [
            icons.shield,
            "Built for the everyday",
            "A 5-year warranty on every frame.",
          ],
        ].map(([icon, title, copy]) => (
          <div className="reveal" key={title}>
            <img src={icon} alt="" />
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        ))}
      </section>

      <section className="newsletter">
        <div>
          <p className="eyebrow">A good thing, now and then</p>
          <h2>Make yourself at home.</h2>
        </div>
        <div className="signup">
          <p>
            New pieces, thoughtful stories, and 10% off your first order. A
            little Meridian in your inbox.
          </p>
          <form>
            <label className="sr-only" htmlFor="email">
              Your email address
            </label>
            <input id="email" type="email" placeholder="Your email address" />
            <button aria-label="Subscribe">
              <img src={icons.arrowRight} alt="" />
            </button>
          </form>
          <small>
            Only the good stuff. Unsubscribe whenever you like. By signing up,
            you agree to our Privacy Policy.
          </small>
        </div>
      </section>

      <footer>
        <div className="footer-main">
          <div className="footer-brand">
            <h2>Meridian</h2>
            <p>
              Furniture for a slower life. Thoughtfully designed, honestly made,
              and always at home.
            </p>
            <a href="mailto:hello@meridian.com">hello@meridian.com</a>
            <div>
              <a href="#">Instagram ↗</a>
              <a href="#">Pinterest ↗</a>
            </div>
          </div>
          <div className="footer-links">
            <div>
              <strong>Explore</strong>
              <a href="#">All furniture</a>
              <a href="#">Seating</a>
              <a href="#">Tables</a>
              <a href="#">Objects</a>
              <a href="#">New arrivals</a>
            </div>
            <div>
              <strong>Meridian</strong>
              <a href="#">Our story</a>
              <a href="#">Materials &amp; makers</a>
              <a href="#">Journal</a>
              <a href="#">Visit our studio</a>
            </div>
            <div>
              <strong>Here to help</strong>
              <a href="#">Delivery &amp; returns</a>
              <a href="#">Care guide</a>
              <a href="#">FAQs</a>
              <a href="#">Contact us</a>
            </div>
          </div>
        </div>
        <div className="legal">
          <span>© 2026 Meridian. Designed for living.</span>
          <span>Privacy policy&nbsp;&nbsp;&nbsp; Terms &amp; conditions</span>
          <span>
            United States / USD $ <img src={icons.chevronDown} alt="" />
          </span>
        </div>
        <div className="asset-preload" aria-hidden="true">
          <img src={icons.chevronLeft} alt="" />
          <img src={icons.chevronRight} alt="" />
          <img src={icons.arrowSmall} alt="" />
        </div>
      </footer>
    </main>
  )
}

export default App
