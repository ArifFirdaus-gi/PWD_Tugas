<?php
    class Segitiga{
        public $tinggi = 0;
        public $alas = 0;
        public $sisi = 0;
        

        function setAll($t, $a, $s){
            $this->tinggi = $t;
            $this->alas = $a;
            $this->sisi = $s;
        }

        function tampil(){
            echo "Tinggi: ". $this->tinggi. "<br>";
            echo "Alas: ". $this->alas. "<br>";
            echo "Sisi: ". $this->sisi. "<br>";
        }
    }

    class SegitigaSamaKaki extends Segitiga{
        function __construct(){
            echo "<h3>Segitiga sama kaki </h3>";
        }

        function hitungLuas(){
            return (($this->tinggi * $this->alas) / 2); 
        }

        function hitungKeliling(){
            return ($this->alas + (2 * $this->sisi));
        }
    }

    class SegitigaSikuSiku extends Segitiga{
        function __construct(){
            echo "<h3>Segitiga siku-siku </h3>";
        }

        function hitungLuas(){
            return (($this->tinggi * $this->alas) / 2); 
        }

        function hitungKeliling(){
            return ($this->tinggi + $this->alas + $this->sisi);
        }
    }

    class SegitigaSamaSisi extends Segitiga{
        function __construct(){
            echo "<h3>Segitiga sama sisi </h3>";
        }

        function hitungLuas(){
            return (($this->tinggi * $this->alas) / 2); 
        }

        function hitungKeliling(){
            return (3 * $this->sisi);
        }
    }

    $segitiga1 = new SegitigaSamaKaki();
    $segitiga1->setAll(3, 4, 5);
    $segitiga1->tampil();
    echo "Luas: ". $segitiga1->hitungLuas(). "<br>";
    echo "Keliling : ". $segitiga1->hitungKeliling(), "<br>";

    $segitiga2 = new SegitigaSamaKaki();
    $segitiga2->setAll(4, 6, 5);
    $segitiga2->tampil();
    echo "Luas: ". $segitiga2->hitungLuas(). "<br>";
    echo "Keliling : ". $segitiga2->hitungKeliling(), "<br>";

    $segitiga3 = new SegitigaSamaKaki();
    $segitiga3->setAll(5, 6, 5);
    $segitiga3->tampil();
    echo "Luas: ". $segitiga3->hitungLuas(). "<br>";
    echo "Keliling : ". $segitiga3->hitungKeliling(), "<br>";