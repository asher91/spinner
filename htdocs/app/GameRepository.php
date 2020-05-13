<?php
require_once "../app/Database.php";

class GameRepository{
    public static function GetGame($name){
    	$game = (object) array();
        $game->sections = [];
        $game->odds = (object) array();

        $game->tour = (object) array();
        
        $element = (object) array();
        $element->title = "Spin";
        $element->value = "Spin";
        $element->color = "#364c62";

        $game->odds->Spin = $element;

        $element = (object) array();
        $element->title = "2X";
        $element->value = "2";
        $element->color = "#e67e21";
        $game->odds->X2 = $element;

        $element = (object) array();
        $element->title = "3X";
        $element->value = "3";
        $element->color = "#30bc9b";
        $game->odds->X3 = $element;

        $element = (object) array();
        $element->title = "5X";
        $element->value = "5";
        $element->color = "#8e43ad";
        $game->odds->X5 = $element;

        $element = (object) array();
        $element->title = "10X";
        $element->value = "10";
        $element->color = "#2980b9";
        $game->odds->X10 = $element;

        array_push($game->sections, $game->odds->Spin);
        array_push($game->sections, $game->odds->X2);
        array_push($game->sections, $game->odds->X3);
        array_push($game->sections, $game->odds->X5);
        array_push($game->sections, $game->odds->X10);
        array_push($game->sections, $game->odds->X5);
        array_push($game->sections, $game->odds->X3);
        array_push($game->sections, $game->odds->X2);
        array_push($game->sections, $game->odds->Spin);
        array_push($game->sections, $game->odds->X2);
        array_push($game->sections, $game->odds->X3);
        array_push($game->sections, $game->odds->X5);
        array_push($game->sections, $game->odds->X3);
        array_push($game->sections, $game->odds->X2);
        array_push($game->sections, $game->odds->Spin);
        array_push($game->sections, $game->odds->X2);
        array_push($game->sections, $game->odds->X3);
        array_push($game->sections, $game->odds->X5);
        array_push($game->sections, $game->odds->X10);
        array_push($game->sections, $game->odds->X5);
        array_push($game->sections, $game->odds->X3);
        array_push($game->sections, $game->odds->X2);
        array_push($game->sections, $game->odds->Spin);
        array_push($game->sections, $game->odds->X2);
        array_push($game->sections, $game->odds->X3);
        array_push($game->sections, $game->odds->X5);
        array_push($game->sections, $game->odds->X3);
        array_push($game->sections, $game->odds->X2);

        return $game;
    }
}