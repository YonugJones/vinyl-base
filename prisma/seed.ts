import 'dotenv/config'
import { PrismaClient, Condition, Format, Rpm } from '../src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  // Optional: reset in dev
  await prisma.copy.deleteMany()
  await prisma.release.deleteMany()

  // ----- 16 Releases -----
  const releases = await prisma.$transaction([
    prisma.release.create({
      data: {
        artist: 'Quasimoto',
        title: 'The Unseen',
        year: 2000,
        label: 'Stones Throw',
        format: Format.LP,
        rpm: Rpm.RPM_33,
      },
    }),
    prisma.release.create({
      data: {
        artist: 'Madvillain',
        title: 'Madvillainy',
        year: 2004,
        label: 'Stones Throw',
        format: Format.LP,
        rpm: Rpm.RPM_33,
      },
    }),
    prisma.release.create({
      data: {
        artist: 'J Dilla',
        title: 'Donuts',
        year: 2006,
        label: 'Stones Throw',
        format: Format.LP,
        rpm: Rpm.RPM_33,
      },
    }),
    prisma.release.create({
      data: {
        artist: 'A Tribe Called Quest',
        title: 'The Low End Theory',
        year: 1991,
        label: 'Jive',
        format: Format.LP,
        rpm: Rpm.RPM_33,
      },
    }),
    prisma.release.create({
      data: {
        artist: 'OutKast',
        title: 'Aquemini',
        year: 1998,
        label: 'LaFace',
        format: Format.LP,
        rpm: Rpm.RPM_33,
      },
    }),
    prisma.release.create({
      data: {
        artist: 'MF DOOM',
        title: 'Operation: Doomsday',
        year: 1999,
        label: "Fondle 'Em",
        format: Format.LP,
        rpm: Rpm.RPM_33,
      },
    }),
    prisma.release.create({
      data: {
        artist: 'Nas',
        title: 'Illmatic',
        year: 1994,
        label: 'Columbia',
        format: Format.LP,
        rpm: Rpm.RPM_33,
      },
    }),
    prisma.release.create({
      data: {
        artist: 'The Alchemist',
        title: 'Alfredo',
        year: 2020,
        label: 'ALC Records',
        format: Format.LP,
        rpm: Rpm.RPM_33,
      },
    }),
    prisma.release.create({
      data: {
        artist: 'Kendrick Lamar',
        title: 'To Pimp a Butterfly',
        year: 2015,
        label: 'Top Dawg',
        format: Format.LP,
        rpm: Rpm.RPM_33,
      },
    }),
    prisma.release.create({
      data: {
        artist: 'Freddie Gibbs',
        title: 'Piñata',
        year: 2014,
        label: 'Madlib Invazion',
        format: Format.LP,
        rpm: Rpm.RPM_33,
      },
    }),
    prisma.release.create({
      data: {
        artist: 'Common',
        title: 'Be',
        year: 2005,
        label: 'GOOD Music',
        format: Format.LP,
        rpm: Rpm.RPM_33,
      },
    }),
    prisma.release.create({
      data: {
        artist: 'D’Angelo',
        title: 'Voodoo',
        year: 2000,
        label: 'Virgin',
        format: Format.LP,
        rpm: Rpm.RPM_33,
      },
    }),
    prisma.release.create({
      data: {
        artist: 'The Roots',
        title: 'Things Fall Apart',
        year: 1999,
        label: 'MCA',
        format: Format.LP,
        rpm: Rpm.RPM_33,
      },
    }),
    prisma.release.create({
      data: {
        artist: 'Wu-Tang Clan',
        title: 'Enter the Wu-Tang (36 Chambers)',
        year: 1993,
        label: 'Loud',
        format: Format.LP,
        rpm: Rpm.RPM_33,
      },
    }),
    prisma.release.create({
      data: {
        artist: 'Erykah Badu',
        title: 'Baduizm',
        year: 1997,
        label: 'Universal',
        format: Format.LP,
        rpm: Rpm.RPM_33,
      },
    }),
    prisma.release.create({
      data: {
        artist: 'Nujabes',
        title: 'Modal Soul',
        year: 2005,
        label: null,
        format: Format.LP,
        rpm: Rpm.RPM_33,
      },
    }),
  ])

  // ----- 9 Copies -----
  await prisma.copy.createMany({
    data: [
      {
        releaseId: releases[0].id,
        purchaseDate: new Date('2024-01-12'),
        purchasePriceCents: 3200,
        mediaCondition: Condition.NEAR_MINT,
        sleeveCondition: Condition.VERY_GOOD_PLUS,
        notes: 'Original pressing. Sounds amazing.',
        isFavorite: true,
        storageLocation: 'Shelf A1',
      },
      {
        releaseId: releases[1].id,
        purchaseDate: new Date('2023-11-05'),
        purchasePriceCents: 2800,
        mediaCondition: Condition.VERY_GOOD,
        sleeveCondition: Condition.VERY_GOOD,
        isFavorite: true,
        storageLocation: 'Shelf A1',
      },
      {
        releaseId: releases[2].id,
        purchaseDate: new Date('2024-02-20'),
        purchasePriceCents: 3500,
        mediaCondition: Condition.MINT,
        sleeveCondition: Condition.MINT,
        storageLocation: 'Shelf A2',
      },
      {
        releaseId: releases[3].id,
        purchaseDate: new Date('2022-09-01'),
        purchasePriceCents: 2200,
        mediaCondition: Condition.GOOD_PLUS,
        sleeveCondition: Condition.GOOD,
        storageLocation: 'Shelf B1',
      },
      {
        releaseId: releases[4].id,
        purchaseDate: new Date('2023-04-14'),
        purchasePriceCents: 4000,
        mediaCondition: Condition.NEAR_MINT,
        sleeveCondition: Condition.NEAR_MINT,
        isFavorite: true,
        storageLocation: 'Shelf B2',
      },
      {
        releaseId: releases[5].id,
        purchaseDate: new Date('2021-12-25'),
        purchasePriceCents: 1800,
        mediaCondition: Condition.FAIR,
        sleeveCondition: Condition.GOOD,
        storageLocation: 'Shelf C1',
      },
      {
        releaseId: releases[6].id,
        purchaseDate: new Date('2020-05-10'),
        purchasePriceCents: 2600,
        mediaCondition: Condition.VERY_GOOD_PLUS,
        sleeveCondition: Condition.VERY_GOOD_PLUS,
        storageLocation: 'Shelf C2',
      },
      {
        releaseId: releases[7].id,
        purchaseDate: new Date('2024-03-03'),
        purchasePriceCents: 3100,
        mediaCondition: Condition.NEAR_MINT,
        sleeveCondition: Condition.VERY_GOOD_PLUS,
        storageLocation: 'Shelf D1',
      },
      {
        releaseId: releases[8].id,
        purchaseDate: new Date('2024-06-18'),
        purchasePriceCents: 3700,
        mediaCondition: Condition.MINT,
        sleeveCondition: Condition.NEAR_MINT,
        isFavorite: true,
        storageLocation: 'Shelf D2',
      },
    ],
  })

  console.log('🌱 Seed complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
