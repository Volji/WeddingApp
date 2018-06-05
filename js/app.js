var app = angular.module("app", ["firebase"]);

app.controller("MainCtrl", function($scope, $firebaseArray){
	//declaration reservation
	var ref = new Firebase("https://test1-26bd6.firebaseio.com/reservation");
	$scope.reservation = $firebaseArray(ref);
	//fin chargement
	/*
	$scope.$watch("$viewContentLoaded", function(){
		document.getElementById("chargement").style.display = "none";
		document.getElementById("liste").style.display = "block";
	});
	*/
	//Valeur du filtre
	$scope.numLimit = 100;
	$scope.numBegin = 0;

	//**** Add reservation ****//
	$scope.addReservation = function(newReservation){
		$scope.newReservation.date = m.getDate() + "-" + m.getMonth() + "-" + m.getFullYear();;
		$scope.newReservation.tps = m.getTime();
		$scope.reservation.$add(newReservation);
		$scope.newReservation.nom = "";
		$scope.newReservation.email = "";
		$scope.newReservation.adulte = "";
		$scope.newReservation.enfant = "";
		$scope.newReservation.commentaire = "";
		$scope.newReservation.brunch = "";

	}

	//**** Edit reservation ****//

	//$scope.oldReserv = {};

	$scope.editReservation = function(reserv){
		//mode edition
		$scope.editMode = true;
		//conserve les anciennes données
		//$scope.oldReserv = reserv;
		$scope.oldReserv = Object.assign({}, reserv)﻿;
	};

	//**** MAJ Réservation ****//
	//MAJ
	$scope.updateReservation = function(reserv){
		ref.child(reserv.$id).update({adulte: reserv.adulte, enfant: reserv.enfant});
		$scope.cancelEdit();
	};
	//Annuler
	$scope.cancelEdit = function(id){
		$scope.editMode = false;
		//$scope.oldReserv = {};
	};
	//Supprimer
	$scope.supprimer = function(id){
		ref.child(id).remove();
	};

})

angular.element(document).ready(function(){
	//document.getElementById("liste").style.display = "block";
	//document.getElementById("chargement").style.display = "none";
});


app.filter("UserFilter", function(){
    return function(reservation, nom){
        var addUser;
        var selectedUsers = [];
        for(i=0; i < reservation.length; i++){

            addUser = false;

						var var1 = reservation[i].nom.toUpperCase();
						var var2 = nom.toUpperCase();
                //if(reservation[i].nom == nom){
						if (var1.startsWith(var2)) {
                    addUser = true;
            }

            if (addUser){
                selectedUsers.push(reservation[i]);
            }
        }
        return selectedUsers;
    };
});
