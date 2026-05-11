'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaFilePdf } from 'react-icons/fa';

const archive = [
  { year: '2025', month: 'September', edition: '38th', cover: '2025', pdfLink: '#' },
  { year: '2024', month: 'September', edition: '37th', cover: '2024', pdfLink: '#' },
  { year: '2023', month: 'September', edition: '35th', cover: '2023_SEP', pdfLink: '/books/2023%20sept.pdf' },
  { year: '2023', month: 'March', edition: '34th', cover: '2023_MAR', pdfLink: '/books/2023%20march.pdf' },
  { year: '2018', month: 'September', edition: '29th', cover: '2018', pdfLink: '/books/2018%20sep.pdf' },
  { year: '2010', month: 'March', edition: '21st', cover: '2010', pdfLink: '/books/2010%20March%20it%20book%20(1).pdf' },
  { year: '2009', month: 'September', edition: '20th', cover: '2009_SEP', pdfLink: '/books/2009%20setp.pdf' },
  { year: '2009', month: 'March', edition: '19th', cover: '2009_MAR', pdfLink: '/books/2009%20march.pdf' },
  { year: '2008', month: 'September', edition: '18th', cover: '2008_SEP', pdfLink: '/books/2008-Sep.pdf' },
  { year: '2008', month: 'Special', edition: '20th Anniv', cover: '2008_SPEC', pdfLink: '/books/2008-20th_Anniversary-Special_Book.pdf' },
  { year: '2006', month: 'September', edition: '17th', cover: '2006_SEP', pdfLink: '/books/2006-Sep.pdf' },
  { year: '2005', month: 'September', edition: '16th', cover: '2005_SEP', pdfLink: '/books/2005-Sep.pdf' },
  { year: '2004', month: 'September', edition: '15th', cover: '2004_SEP', pdfLink: '/books/2004-Sep.pdf' },
  { year: '2004', month: 'March', edition: '14th', cover: '2004_MAR', pdfLink: '/books/2004-March.pdf' },
  { year: '2003', month: 'September', edition: '13th', cover: '2003_SEP', pdfLink: '/books/2003-Sep.pdf' },
  { year: '2003', month: 'March', edition: '12th', cover: '2003_MAR', pdfLink: '/books/2003-March.pdf' },
  { year: '2002', month: 'September', edition: '11th', cover: '2002_SEP', pdfLink: '/books/2002-Sep.pdf' },
  { year: '2002', month: 'March', edition: '10th', cover: '2002_MAR', pdfLink: '/books/2002-March.pdf' },
  { year: '2001', month: 'September', edition: '9th', cover: '2001_SEP', pdfLink: '/books/2001-Sep.pdf' },
  { year: '1999', month: 'Special', edition: '10th Anniv', cover: '1999', pdfLink: '/books/1999-10th_Anniversary-Special_Book.pdf' },
  { year: '1989', month: 'November', edition: '1st Monthly', cover: '1989', pdfLink: '#' },
];

export default function DigitalLibraryGrid() {
  return (
    <section className="w-full bg-primary-dark py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/textures/parchment.png')] opacity-5 mix-blend-overlay" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl text-accent font-bold tracking-widest uppercase mb-4">
            Digital Library
          </h2>
          <p className="font-body text-cream/70 text-lg">Explore the archives of student expression</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {archive.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Bookmark Ribbon */}
              <div className="absolute -top-2 right-4 w-6 h-12 bg-red-800 z-20 shadow-md transform origin-top transition-transform group-hover:scale-y-125 before:absolute before:bottom-[-10px] before:left-0 before:w-0 before:h-0 before:border-l-[12px] before:border-r-[12px] before:border-t-[12px] before:border-l-transparent before:border-r-transparent before:border-t-red-800" />

              <Link
                href={item.pdfLink !== '#' ? item.pdfLink : `/library/${item.year}/${item.month}`}
                target={item.pdfLink !== '#' ? '_blank' : '_self'}
                prefetch={false}
                className="block"
              >
                <div className="relative aspect-[3/4] bg-[#0B3D2E] rounded border border-[#8B6914]/40 shadow-lg overflow-hidden group-hover:shadow-[0_10px_30px_rgba(201,168,76,0.2)] transition-shadow">
                  {/* Decorative book spine */}
                  <div className="absolute left-0 top-0 w-4 h-full bg-[#072C21] border-r border-[#8B6914]/20 z-10" />

                  {/* Inner Content */}
                  <div className="ml-4 p-4 h-full flex flex-col items-center justify-center bg-primary text-center">
                    <span className="font-tamil text-2xl font-bold bg-gold-gradient text-transparent bg-clip-text mb-2 block">
                      இளந்தாது
                    </span>
                    <span className="bg-accent/20 text-accent px-2 py-1 text-xs font-bold rounded mb-4">
                      {item.edition}
                    </span>
                    <div className="mt-auto">
                      <div className="text-cream/90 font-heading font-bold text-xl">{item.year}</div>
                      <div className="text-cream/50 text-sm uppercase tracking-widest">{item.month}</div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#072C21]/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FaFilePdf className="text-4xl text-accent" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/library"
            className="inline-block px-8 py-3 border border-cream/30 text-cream/80 hover:text-white hover:border-white transition-all duration-300 tracking-widest font-bold text-sm"
          >
            VIEW FULL ARCHIVE
          </Link>
        </div>
      </div>
    </section>
  );
}