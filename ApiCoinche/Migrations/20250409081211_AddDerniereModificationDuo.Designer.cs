﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ApiCoinche.Migrations
{
    [DbContext(typeof(CoincheContext))]
    [Migration("20250409081211_AddDerniereModificationDuo")]
    partial class AddDerniereModificationDuo
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.1");

            modelBuilder.Entity("Partie", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.PrimitiveCollection<string>("GagnantsIds")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.PrimitiveCollection<string>("JoueursIds")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("PointsClassement")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Parties");
                });

            modelBuilder.Entity("Profil", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Blaze")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("DerniereModificationDuo")
                        .HasColumnType("TEXT");

                    b.Property<int?>("DuoFavId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Famille")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Mail")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Mdp")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.PrimitiveCollection<string>("PartiesJoueesIds")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("PointsClassement")
                        .HasColumnType("REAL");

                    b.Property<int>("TotalParties")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Victoires")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("DuoFavId");

                    b.ToTable("Profils");
                });

            modelBuilder.Entity("Profil", b =>
                {
                    b.HasOne("Profil", "DuoFav")
                        .WithMany()
                        .HasForeignKey("DuoFavId");

                    b.Navigation("DuoFav");
                });
#pragma warning restore 612, 618
        }
    }
}
